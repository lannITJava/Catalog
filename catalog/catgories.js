/*let listCatalog = [
    {"catalogId":"C001","catalogName":"Danh mục 1","priority":1,"description":"Mô tả 1","status":"active"},
    {"catalogId":"C002","catalogName":"Danh mục 2","priority":2,"description":"Mô tả 2","status":"active"},
    {"catalogId":"C003","catalogName":"Danh mục 3","priority":3,"description":"Mô tả 3","status":"active"},
    {"catalogId":"C004","catalogName":"Danh mục 4","priority":4,"description":"Mô tả 4","status":"active"},
    {"catalogId":"C005","catalogName":"Danh mục 5","priority":5,"description":"Mô tả 5","status":"active"},
    {"catalogId":"C006","catalogName":"Danh mục 6","priority":6,"description":"Mô tả 6","status":"active"},
    {"catalogId":"C007","catalogName":"Danh mục 7","priority":7,"description":"Mô tả 7","status":"active"},
    {"catalogId":"C008","catalogName":"Danh mục 8","priority":8,"description":"Mô tả 8","status":"active"},
    {"catalogId":"C009","catalogName":"Danh mục 9","priority":9,"description":"Mô tả 9","status":"active"},
    {"catalogId":"C0010","catalogName":"Danh mục 10","priority":10,"description":"Mô tả 10","status":"active"},
    {"catalogId":"C0011","catalogName":"Danh mục 11","priority":11,"description":"Mô tả 11","status":"active"},

];
localStorage.setItem("listCatalog",JSON.stringify(listCatalog));*/
let currentPage =1;
let recordsPerPage =3;
let action ="create";
function renderData(page){
    let listCatalog = localStorage.getItem("listCatalog")?JSON.parse(localStorage.getItem("listCatalog")):[];
    let pageMax = getTotalPage(listCatalog);
    if (page <1) {
        page= 1;
    }
    if (page> pageMax) {
        page = pageMax;
    }
    let content = document.getElementById("content");
    content.innerHTML="";
    let indexMinOnPage = (page-1)*recordsPerPage;
    let indexMaxOnPage;
    if (page * recordsPerPage > listCatalog.length) {
        indexMaxOnPage = listCatalog.length;
    }else{
        indexMaxOnPage = page *recordsPerPage;
    }
    for (let index = indexMinOnPage; index < indexMaxOnPage; index++) {
       content.innerHTML+=`<tr>
                            <td>${index+1}</td>
                            <td>${listCatalog[index].catalogId}</td>
                            <td>${listCatalog[index].catalogName}</td>
                            <td>${listCatalog[index].priority}</td>
                            <td>${listCatalog[index].description}</td>
                            <td>${listCatalog[index].status}</td>
                            <td>
                                <button onclick=initEdit("${listCatalog[index].catalogId}")>Edit</button>
                                <button>Delete</button>
                            </td>
                          </tr>`
    }
    let listPage = document.getElementById("listPage");
    listPage.innerHTML= "";
    for (let i = 1; i <= pageMax; i++) {
       listPage.innerHTML+=`<li><a href="javascript:clickPage('${i}')">${i}</a></li>`
    } 
    let preview = document.getElementById("preview");
    let next = document.getElementById("next");
    if (currentPage==1) {
        preview.style.visibility = "hidden";
    }else{
        preview.style.visibility = "visible";
    }
    if (currentPage==pageMax) {
        next.style.visibility ="hidden";
    } else {
        next.style.visibility = "visible";
    }
}
function getTotalPage(listCatalog) {
    return Math.ceil(listCatalog.length/ recordsPerPage);
}
function clickPage(page){
    currentPage = page;
    renderData(page);
}
function previewPage(){
    currentPage--;
    renderData(currentPage);
}
function nextPage(){
    currentPage++;
    renderData(currentPage);
}
let btnSave = document.getElementById("btnSave");
btnSave.addEventListener("click",(event)=>{
    event.preventDefault();
    if (action=="create") {
        createCatalog();
    }else{
        updateCatalog();
    }

})
function createCatalog(){
    let listCatalog = localStorage.getItem("listCatalog")?JSON.parse(localStorage.getItem("listCatalog")):[];
    let newCatalog = getDataForm();
    listCatalog.unshift(newCatalog);
    localStorage.setItem("listCatalog",JSON.stringify(listCatalog));
    renderData(1);
    resetForm();
}
function getDataForm(){
    let catalogId = document.getElementById("catalogId").value;
    let catalogName = document.getElementById("catalogName").value;
    let priority = document.getElementById("priority").value;
    let description = document.getElementById("description").value;
    let status = document.querySelector("input[type= 'radio']:checked").value;
    let catalog = {catalogId,catalogName,priority,description,status};
    return catalog;
}
function resetForm(){
    document.getElementById("catalogId").value="";
    document.getElementById("catalogName").value="";
    document.getElementById("priority").value="";
    document.getElementById("description").value="";
    document.getElementById("active").checked= true;
}
function initEdit(catalogId){
    let listCatalog = localStorage.getItem("listCatalog")?JSON.parse(localStorage.getItem("listCatalog")):[];
    let index = getCatalogById(listCatalog,catalogId);
    document.getElementById("catalogId").value= listCatalog[index].catalogId;
    document.getElementById("catalogId").readOnly = true;
    document.getElementById("catalogName").value= listCatalog[index].catalogName;
    document.getElementById("priority").value= listCatalog[index].priority;
    document.getElementById("description").value = listCatalog[index].description;
    if (listCatalog[index].status=="active") {
        document.getElementById("active").checked = true;
    }else{
        document.getElementById("inActive").checked= true;
    }
    action="edit";
}
function getCatalogById(listCatalog,catalogId){
    for (let index = 0; index < listCatalog.length; index++) {
       if (listCatalog[index].catalogId==catalogId) {
        return index;
       }
    }
    return -1;
}
function updateCatalog(){
    let listCatalog = localStorage.getItem("listCatalog")?JSON.parse(localStorage.getItem("listCatalog")):[];
    let updateCatalog =getDataForm();
    let index = getCatalogById(listCatalog,updateCatalog.catalogId);
    if (index>-1) {
        listCatalog[index]== updateCatalog;
    }
    localStorage.setItem("listCatalog",JSON.stringify(listCatalog));
    action="create";
    resetForm();
    document.getElementById("catalogId").readOnly= false;
    renderData(1);
}
document.onload = renderData(1);

