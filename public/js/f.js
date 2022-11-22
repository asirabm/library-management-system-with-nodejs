FilePond.registerPlugin(
    FilePondPluginImagePreview,
    FilePondPluginImageResize,
    FilePondPluginFileEncode
)
FilePond.setOptions({
    stylePanelAspectRatio: 150/100,
    imageResizeTargertWidth:100,
    imageResizeTargertHeight:150

})
console.log(FilePond)
FilePond.parse(document.body);
