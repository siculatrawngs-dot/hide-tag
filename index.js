(() => {
    let patches = [];
    return {
        onLoad: () => {
            try {
                const { findByProps, findByName } = window.vendetta.metro;
                const { after } = window.vendetta.patcher;
                
                const tag = findByName("BotTag", false);
                if (tag) patches.push(after("default", tag, () => null));

                const userStore = findByProps("getUser");
                if (userStore && userStore.getUser) {
                    patches.push(after("getUser", userStore, (_, res) => {
                        if (res) { 
                            try { res.bot = false; res.isApp = false; res.system = false; } catch(e){} 
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
})();
