module.exports = {
    mode: "development",
    devtool: "eval-source-map",
    devServer: {
        liveReload:true,
        open: true,
        watchFiles: ["./web/react/**/**/**/**/*.{js,jsx,ts,tsx,css}"],
        port: 3000,
        historyApiFallback: true
    }
};
