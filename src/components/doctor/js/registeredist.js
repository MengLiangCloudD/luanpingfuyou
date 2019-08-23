const fetchopenid=(url,cardno,that)=>{
    let state
    that.isShowLoading=true
    $.ajax({
        url: url,
        type: "post",
        dataType: "json",
        async: false,
        data: {
            cardno
        },
        success: function(data) {
            that.isShowLoading=false
            state=data
        },
        error: function(data) {
            that.isShowLoading=false
            state={status:5}
        }
    });
    return state
}
const requestpatients=(url,deptcode,docname)=>{
    let state
    return new Promise((resolve,reject)=>{
        $.ajax({
            url: url,
            type: "post",
            dataType: "json",
            async: true,
            data: {
                deptcode,
                docname
            },
            success: function(data) {
                state=data
                resolve(state)
            },
            error: function(data) {
                state=5
                resolve(state)
            }
        });
    })
}

const changedoctorstate=(url,cliniclabel,code,that)=>{
    let state
    that.isShowLoading=true
    return new Promise((resolve,reject)=>{
        $.ajax({
            url: url,
            type: "post",
            dataType: "json",
            async: true,
            data: {
                cliniclabel,
                code
            },
            success: function(data) {
                that.isShowLoading=false
                state=data
                resolve(state)
            },
            error: function(data) {
                that.isShowLoading=false
                state={status:5}
                resolve(state)
            }
        });
    })
}

const fetchdoctorstate=(url,doctorno,that)=>{
    let result
    that.isShowLoading=true
    $.ajax({
        url: url,
        type: "post",
        dataType: "json",
        async: false,
        data: {
            doctorno
        },
        success: function(data) {
            that.isShowLoading=false
            result=data
        },
        error: function(data) {
            that.isShowLoading=false
            result={status:5}
        }
    });
    return result
}

export {requestpatients,changedoctorstate,fetchdoctorstate,fetchopenid}