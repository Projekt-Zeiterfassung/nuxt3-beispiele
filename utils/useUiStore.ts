import { NavApp, NavLink } from "~~/assets/types";

export default definePiniaStore({
    id: 'ui',
    state: () => ({
        darkmode: false,
        popUpPadding: 15,
        appTitlePrefix: '',
        appTitle: '',
        appTitleSuffix: '',
        appColor: '',
        appFontColor: '',
        links: [] as NavLink[],
        apps: [] as NavApp[],
        searchVisible: false,
        searchValue: '',
    }),
    getters: {
        getDarkmode: state => state.darkmode,
        getPopUpPadding: state => state.popUpPadding,
        getAppTitle: state => {
            if (state.appTitle == '') return state.appTitlePrefix;

            const big = ref(window.innerWidth > 750);
            window.addEventListener('resize', () => {
                if (big.value && window.innerWidth < 750) big.value = false;
                else if (!big.value && window.innerWidth > 750) big.value = true;
            });
            return big.value ? `${state.appTitlePrefix} : ${state.appTitle}` : state.appTitle;
        },
        getAppColor: state => state.appColor,
        getAppFontColor: state => state.appFontColor,
        getLinks: state => state.links,
        getApps: state => state.apps,
        getSearchVisible: state => state.searchVisible,
        getSearchValue: state => state.searchValue,
    },
    actions: {
        toggleDarkmode() {
            this.darkmode = !this.darkmode;
        },
        setPopUpPadding(value: number) {
            this.popUpPadding = value;
        },
        setAppTitlePrefix(value: string) {
            this.appTitlePrefix = value;
        },
        setAppTitle(value: string) {
            this.appTitle = value;
        },
        setAppTitleSuffix(value: string) {
            this.appTitleSuffix = value;
        },
        setAppColor(value: string) {
            this.appColor = value;
        },
        setAppFontColor(value: string) {
            this.appFontColor = value;
        },
        setLinks(value: NavLink[]) {
            this.links = value;
        },
        setApps(value: NavApp[]) {
            this.apps = value;
        },
        setSearchVisible(value: boolean) {
            this.searchVisible = value;
        },
        setSearchValue(value: string) {
            this.searchValue = value;
        },
    },
});
