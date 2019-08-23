import { resolve } from "url";

export const test=async ()=>{
    const data=await fetchecklist()
    return data
}

export const test2=async (data)=>{
    const checklist=savechecklist(data)
    return checklist
}

export const test1=()=>{
    return new Promise(resolve=>{
        let url='http://192.168.33.28:8080/check/getcheckclass.do'
        $.ajax({
            url: url,
            type: "post",
            dataType: "json",
            async: false,
            data:'',
            success: function(data) {
                resolve(data.data)
            },
            error: function(data) {
            }
        });
    })
    
}

export const test2=(data)=>{
    return new Promise(resolve=>{
        let checklist=data
        let dealchecklist=[]
        let arr=[]
        for(let i=0;i<data.length;i++){
            let item={
                value:data[i].exam_class_name,
                label:data[i].exam_class_name
            }
            arr.push(item)
        }
        resolve({arr,checklist,dealchecklist}) 
    })
    
}

export const test3=(deptcode)=>{
    let url='http://192.168.33.28:8080/check/getdeptname.do'
    $.ajax({
        url: url,
        type: "post",
        dataType: "json",
        async: false,
        data:{deptcode},
        success: function(data) {
            return data.data[0].dept_name
        },
        error: function(data) {
        }
    });
}