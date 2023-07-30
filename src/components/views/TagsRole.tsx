import { Tag } from 'antd'
import React from 'react'
import { ROLES } from 'types/global'
type PROPS_TYPE = {
    role: ROLES
}
const TagsRole = ({ role }: PROPS_TYPE) => {
    if (role === ROLES.ADMIN)
        return (
            <Tag style={{ marginLeft: "10px" }} color="warning">
                {role}
            </Tag>
        )
    else if (role === ROLES.CUSTOMER)
        return <Tag style={{ marginLeft: "10px" }} color="success">
            Khách hàng
        </Tag>
    else if (role === ROLES.EMPLOYEE)
        return <Tag style={{ marginLeft: "10px" }} color="geekblue">
            Nhân viên kinh doanh
        </Tag>
    else
        return <Tag style={{ marginLeft: "10px" }} color="lime-inverse">
            Nhân viên kỉ thuật
        </Tag>
}

export default TagsRole