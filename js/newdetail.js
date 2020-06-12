var itemNewsId=String(getQueryVariable('newsId'));//获取新闻id

window.onload=function(){
    getSourceDetail();
}

//获取文章详情
function getSourceDetail(){
    contrLoadingView('on','加载中···');
    ajaxHttp({
        url:'/app/journal/selectByPrimaryKey',
        type:'POST',
        data:{
            id:itemNewsId
        },
        success:function(res){
            contrLoadingView('off');
            if(res.code==0){
                templateHtml(res.journal,'detailTemplate','detailBox');             
            }
        }
    })
}