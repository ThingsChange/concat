/**
 * Created by wlj at 2017/11/27.
 * dependent:
 * function:
 */
const commonConfig = {
    ...
        parts.loadFonts({
            options: {

                name: "[name].[ext]",


                name: "[name].[hash:8].[ext]",

            },
        }),
    ...
};

const productionConfig = merge([
    {
        ...

            output: {
    chunkFilename: "[name].[chunkhash:8].js",
        filename: "[name].[chunkhash:8].js",
},

},
...
parts.loadImages({
    options: {
        limit: 15000,

        name: "[name].[ext]",


        name: "[name].[hash:8].[ext]",

    },
}),
...
]);