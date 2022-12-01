const rootStyles=window.getComputedStyle(document.documentElement)
if(rootStyles.getPropertyValue('--book-cover-width-large')!=null){
    ready()
}
else{
    document.getElementById('main-css').addEventListener('load',ready)
}
function ready(){
 const coverWidth=parseFloat(rootStyles.getPropertyValue('--book-cover-width-large'))
 const aspectRatio=parseFloat(rootStyles.getPropertyValue('--book-cover-width-ratio'))
 const coverhight=aspectRatio/coverWidth

 FilePond.registerPlugin(
    FilePondPluginImagePreview,
    FilePondPluginImageResize,
    FilePondPluginFileEncode
)
FilePond.setOptions({
    stylePanelAspectRatio: aspectRatio,
    imageResizeTargertWidth:coverWidth,
    imageResizeTargertHeight:coverhight

})
console.log(FilePond)
FilePond.parse(document.body);



}


