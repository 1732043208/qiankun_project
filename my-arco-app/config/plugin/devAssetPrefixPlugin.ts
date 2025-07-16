// plugins/devAssetPrefixPlugin.ts
export default function devAssetPrefixPlugin(prefix = '/my-static-prefix') {
    return {
        name: 'dev-asset-prefix',
        apply: 'serve',
        transformIndexHtml(html: string) {
            // 仅给 assets 文件夹内的文件加前缀
            return html.replace(/(href|src)=(["'])\/assets\/([^"'#>]+)/g, `$1=$2${prefix}/assets/$3`);
        }
    };
}