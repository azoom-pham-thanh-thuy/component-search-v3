import { getActivePinia, setActivePinia, createPinia, defineStore } from 'pinia'
import { isEqual, last, get, cloneDeep } from 'lodash'
import { format } from 'date-fns'
import { buildConfig } from '@/utils/config'
import Preset from '@/utils/Preset'
// import randomstring from 'randomstring'
import { generateRandomString } from '@/utils/app'
import type {
  Obj,
  Filter,
  Bookmark,
  Settings,
  Runtime,
  Preference,
  Config,
  InputType,
  StoreAdditional,
  History
} from '@/types'

if (!getActivePinia()) setActivePinia(createPinia())

export default (
  storeId: string,
  { state, actions }: StoreAdditional = {}
) => {
  return defineStore(storeId || 'searchStore', () => {
    const settings = ref<Settings>({
      categorizedFilters: null,
      filters: [],
      searchAfterFilterChanged: false,
      searchAfterInit: false,
      allowEmptyFilters: false,
      historySize: 20,
      isMinimalMode: false,
      searchWithQueryStringOnInit: false,
    })
    const runtime = ref<Runtime>({
      modal: null,
      isCompactView: false,
      selectedFilterName: null,
      selectedBookmark: null,
      searchCall: null,
      filterValues: {},
      searching: false,
    })
    const preference = ref<Preference>({
      initialized: false,
      pinnedFilterNames: [],
      histories: [],
      bookmarks: [],
    })

    const appliedFilters = computed(() =>
      Reflect.ownKeys(runtime.value.filterValues)
        .map((filterName) => {
          return settings.value.filters.find(
            (filter) => filter.name === filterName
          )
        })
        .filter((filter) => filter)
    )

    const canSearch = computed(() => {
      if (appliedFilters.value.length === 0) {
        return settings.value.allowEmptyFilters
      }
      if (appliedFilters.value.length === 1) {
        const appliedFilter = appliedFilters.value[0]
        const filter = settings.value.filters.find(
          ({ name }) => name === appliedFilter?.name
        )
        if (filter?.allowSingleSearch) {
          return true
        }
      }
      return isAppliedRequiredFilters.value
    })

    const requiredFilters = computed(() => {
      return settings.value.filters.filter(({ required }) => required)
    })

    const isAppliedRequiredFilters = computed(() => {
      const appliedNames = appliedFilters.value.map((filter) => filter?.name)
      const requiredNames = requiredFilters.value.map((filter) => filter?.name)
      return requiredNames.every((name) => appliedNames.includes(name))
    })

    const selectedFilter = computed(() => {
      return settings.value.filters.find(
        ({ name }) => name === runtime.value.selectedFilterName
      )
    }) as ComputedRef<Filter>

    const selectedFilterValue = computed(() => {
      const filterValue =
        runtime.value.filterValues[String(runtime.value.selectedFilterName)]
      if (typeof filterValue === 'boolean') return String(filterValue)
      if (filterValue) return filterValue

      const defaultValue = selectedFilter.value?.defaultValue
      if (defaultValue) return defaultValue()

      return undefined
    })

    const categoryEnabled = computed(() => {
      return Boolean(settings.value.categorizedFilters)
    })

    const pinnedFilters = computed(() => {
      return preference.value.pinnedFilterNames.reduce(
        (pinnedFilters: Filter[], name: string) => {
          const filter = settings.value.filters.find(
            (filter) => filter.name === name
          )
          if (filter) pinnedFilters.push(filter)
          return pinnedFilters
        },
        []
      )
    })

    const defaultBookmark = computed(() => {
      return preference.value.bookmarks.find(
        (bookmark: Bookmark) => bookmark.isDefault
      )
    })

    const fixedFilterValues = computed(() => {
      return Reflect.ownKeys(runtime.value.filterValues).reduce(
        (filterValues: Obj, filterName: string | symbol) => {
          const filter = settings.value.filters.find(
            (filter) => filter.name === filterName
          )
          if (filter) {
            const filterValue = runtime.value.filterValues[String(filterName)]
            filterValues[String(filterName)] = Preset.isPreset(filterValue)
              ? filter.presetValueOf?.(filterValue)
              : filterValue
          }
          return filterValues
        },
        {}
      )
    })

    async function init(config: Config) {
      if (!preference.value.initialized) {
        config.pinnedFilterNames = config.defaultPinnedFilterNames
      }
      preference.value.initialized = false
      await buildConfig(config)

      if (defaultBookmark.value) {
        config.filterValues = cloneDeep(defaultBookmark.value.filterValues)
      } else {
        config.filterValues = config.defaultFilterValues
          ? cloneDeep(config.defaultFilterValues)
          : {}
      }

      Object.entries(config).forEach(([key, value]) => {
        if (key in settings.value) {
          // @ts-ignore
          settings.value[key] = value
        } else if (key in runtime.value) {
          // @ts-ignore
          runtime.value[key] = value
        } else if (key in preference.value) {
          // @ts-ignore
          preference.value[key] = value
        }
      })
      preference.value.initialized = true
    }

    function setModal(value: string | null) {
      runtime.value.modal = value
    }

    function showFilters() {
      setModal('filters')
    }

    function showFilter(filterName: null | string) {
      runtime.value.selectedFilterName = filterName
      setModal('filterInput')
    }

    function showHistory() {
      setModal('history')
    }

    function showBookmarks() {
      setModal('bookmarks')
    }

    function showBookmarkEdit(bookmark: Bookmark) {
      runtime.value.selectedBookmark = bookmark
      setModal('bookmarkEdit')
    }

    function hideModal() {
      setModal(null)
      runtime.value.selectedFilterName = null
    }

    function togglePinnedFilter(filterName: string) {
      if (preference.value.pinnedFilterNames.includes(filterName)) {
        const index = preference.value.pinnedFilterNames.indexOf(filterName)
        preference.value.pinnedFilterNames.splice(index, 1)
      } else {
        preference.value.pinnedFilterNames.push(filterName)
      }
    }

    async function callSearch({ recordable = true } = {}) {
      console.log('Lib callSearch:::', { state, actions })
      console.log('\x1B[41;93mstores/index.ts (Line 221), canSearch.value:', canSearch.value);
      if (!canSearch.value) return

      if (typeof actions?.search === 'function') {
        runtime.value.searching = true
        await actions.search(fixedFilterValues.value)
        runtime.value.searching = false
      }
      if (!settings.value.isMinimalMode && recordable) {
        addToHistory(runtime.value.filterValues)
      }
    }

    function updateFilterValues(filterValues: object) {
      runtime.value.filterValues = cloneDeep(filterValues)
      fillRequiredFilterValueIfNeeded()
    }

    function setFilterValue([name, value]: [string, InputType]) {
      // Reorder
      delete runtime.value.filterValues[name]
      runtime.value.filterValues = {
        [name]: cloneDeep(value),
        ...runtime.value.filterValues,
      }
    }

    function updateFilterValue([name, value]: [string, InputType]) {
      setFilterValue([name, value])
      fillRequiredFilterValueIfNeeded()
    }

    function clearFilterValues() {
      runtime.value.filterValues = {}
      fillRequiredFilterValueIfNeeded()
    }

    function removeFilterValue(filterName: string) {
      delete runtime.value.filterValues[filterName]
      fillRequiredFilterValueIfNeeded()
    }

    function fillRequiredFilterValueIfNeeded() {
      if (
        appliedFilters.value.length === 1 &&
        appliedFilters.value[0]?.allowSingleSearch
      ) {
        return
      }
      if (!isAppliedRequiredFilters.value) {
        requiredFilters.value.map((filter) => {
          // @ts-ignore
          setFilterValue([filter.name, filter.defaultValue?.()])
        })
      }
    }

    function addToHistory(filterValues: Obj) {
      const lastHistory = last(preference.value.histories)

      if (!isEqual(filterValues, get(lastHistory, 'filterValues'))) {
        const history = {
          timestamp: format(new Date(), 'YYYY-MM-DD HH:mm:ss'),
          filterValues: { ...filterValues },
        }
        preference.value.histories.push(history)
        if (preference.value.histories.length > settings.value.historySize) {
          preference.value.histories = preference.value.histories.slice(1)
        }
      }
    }

    function removeHistory(history: History) {
      const index = preference.value.histories.findIndex(
        ({ id }) => id === history.id
      )
      preference.value.histories.splice(index, 1)
    }

    function updateBookmark(bookmark: Bookmark) {
      const index = preference.value.bookmarks.findIndex(
        ({ id }) => id === bookmark.id
      )
      preference.value.bookmarks.splice(index, 1, bookmark)
    }

    function saveBookmark(bookmark: Bookmark) {
      if (bookmark.id) {
        if (bookmark.isDefault && defaultBookmark.value) {
          updateBookmark({ ...defaultBookmark.value, isDefault: false })
        }
        updateBookmark(bookmark)
      } else {
        // const id = randomstring.generate(7) // Lib error: global is not defined (https://github.com/browserify/randombytes/issues/29)
        const id = generateRandomString(7)
        preference.value.bookmarks.push({ ...bookmark, id })
      }
    }

    function removeBookmark(bookmark: Bookmark) {
      const index = preference.value.bookmarks.findIndex(
        ({ id }) => id === bookmark.id
      )
      preference.value.bookmarks.splice(index, 1)
    }

    function toggleCompactView() {
      runtime.value.isCompactView = !runtime.value.isCompactView
    }

    return {
      ...state,
      settings,
      runtime,
      preference,
      canSearch,
      requiredFilters,
      isAppliedRequiredFilters,
      selectedFilter,
      selectedFilterValue,
      categoryEnabled,
      pinnedFilters,
      appliedFilters,
      defaultBookmark,
      fixedFilterValues,
      ...actions,
      init,
      showFilters,
      showFilter,
      showHistory,
      showBookmarks,
      showBookmarkEdit,
      hideModal,
      togglePinnedFilter,
      callSearch,
      updateFilterValues,
      updateFilterValue,
      clearFilterValues,
      removeFilterValue,
      removeHistory,
      saveBookmark,
      removeBookmark,
      toggleCompactView,
    }
  })()
}
