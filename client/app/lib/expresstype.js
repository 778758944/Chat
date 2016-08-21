const expressType = [
    {
        id : 0,
        text : ""
    },
    {
        id : 1,
        text : "家"
    },
    {
        id : 2,
        text : "公司"
    },
    {
        id : 3,
        text : "学校"
    }
];
export default expressType;
export  function fetchExpressText(id){
    var text = "";
    for(let i=0,len=expressType.length;i<len;i++){
        if(expressType[i].id == id){
            text = expressType[i]["text"];
            break;
        }
    }
    return text;
}