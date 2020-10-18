import React  from 'react';

const VerifyPermission = ({permission, children}) => {
    const permissions = localStorage.getItem('permissions');
    const isSuper = localStorage.getItem('super') == 1 ? true : false;

    if(isSuper){
        return (
            <div>
                {children}
            </div>
        )
    }

    if(permissions.includes(permission)){
        return (
            <div>
                {children}
            </div>
        )
    }else{
        return (
            <div></div>
        )
    }
}

export default VerifyPermission;
