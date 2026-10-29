let patches = [];
module.exports = {
    onLoad: () => {
        try {
            const { findByProps } = window.vendetta.metro;
            const { after } = window.vendetta.patcher;
            const userStore = findByProps("getUser");
            if (userStore && userStore.getUser) {
                patches.push(after("getUser", userStore, (_, res) => {
                    if (res) { 
                        res.bot = false; 
                        res.isApp = false; 
                    }
                    return res;
                }));
            }
        } catch (e) {}
    },
    onUnload: () => {
        for (let unpatch of patches) unpatch();
        patches = [];
    }
};
