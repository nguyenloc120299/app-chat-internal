import { Avatar, Checkbox, Modal, Spin, Tag } from "antd";
import Search from "antd/es/input/Search";
import { UserOutlined } from "@ant-design/icons";
import { getUsers } from "api/user";
import { useFnLoading, useLoading } from "hooks/useLoading";
import React, { useEffect, useState } from "react";
import { useAppSelector } from "store";
import { styled } from "styled-components";
import { colors } from "styles/theme";
import { ROLES } from "types/global";
import { Quer_User } from "types/query";
import { LoadingOutlined } from "@ant-design/icons";
interface PROPS_TYPE {
  onChange?: any;
  isNew?: boolean;
}
const tags = [
  {
    name: "Tất cả",
    key: "",
  },
  {
    name: "Khách hàng",
    key: ROLES.CUSTOMER,
  },
  {
    name: "Nhân viên kinh doanh",
    key: ROLES.EMPLOYEE,
  },
  {
    name: "Nhân viên kỉ thuật",
    key: ROLES.TECHNIQUE,
  },
];
const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
const ListUsers = ({ onChange, isNew }: PROPS_TYPE) => {
  const [users, setUsers] = useState<any>([]);
  const { conservation } = useAppSelector((state) => state.app) as any;
  const { onLoading } = useFnLoading();
  const isLoading = useLoading("GET_USER");
  const [querys, setQuerys] = useState<Quer_User>({
    page: "1",
    pageSize: "20",
    roleName: "",
    search: "",
  });
  const fetchUsers = async (querys: Quer_User) => {
    setUsers([]);
    onLoading({
      type: "GET_USER",
      value: true,
    });
    try {
      const res = await getUsers({ ...querys });
      setUsers(res?.data);
    } catch (error) {
      console.log(error);
    }
    onLoading({
      type: "GET_USER",
      value: false,
    });
  };
  useEffect(() => {
    fetchUsers(querys);
  }, []);
  return (
    <ListUserStyled>
      <div style={{ marginBottom: "10px" }}>Thêm bạn vào nhóm</div>
      <Search
        placeholder="Nhập tên, số điện thoại"
        allowClear
        size="large"
        value={querys.search}
        onChange={(e: any) => setQuerys({ ...querys, search: e?.target.value })}
        onSearch={() => fetchUsers(querys)}
        enterButton
      />
      <div style={{ margin: "20px 0", cursor: "pointer" }}>
        {tags.map((item: any, index: number) => (
          <Tag
            color={item?.key === querys.roleName ? colors.mainColor : "#ccc"}
            onClick={() => {
              setQuerys({ ...querys, roleName: item?.key });
              fetchUsers({ ...querys, roleName: item?.key });
            }}
            key={index}
            style={{ marginBottom: "5px" }}
          >
            {item?.name}
          </Tag>
        ))}
      </div>

      <div className="users-main">
        <Checkbox.Group className="list-user" onChange={onChange}>
          {isLoading && <Spin indicator={antIcon} />}
          {users?.map((item: any, index: number) => (
            <div className="user-row" key={index}>
              <Checkbox
                value={item._id}
                disabled={
                  isNew &&
                  conservation?.members?.find(
                    (mem: any) => item?._id === mem._id
                  )
                }
              />
              <Avatar
                size={40}
                icon={
                  item?.profilePicUrl ? (
                    <img src={item?.profilePicUrl} alt="" />
                  ) : (
                    <UserOutlined />
                  )
                }
              />
              <div className="name">{item.name}</div>
            </div>
          ))}
        </Checkbox.Group>
      </div>
    </ListUserStyled>
  );
};

export default ListUsers;

const ListUserStyled = styled.div`
  .users-main {
    max-height: 300px;
    overflow-y: scroll;
  }
  .users-main::-webkit-scrollbar {
    width: 5px;
  }
  .users-main::-webkit-scrollbar-track {
    background: #f1f1f1;
  }
  .users-main::-webkit-scrollbar-thumb {
    background: #888;
  }
  .list-user {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 10px;
    .user-row {
      display: flex;
      align-items: center;
      gap: 5px;
      .name {
        font-size: 14px;
        font-weight: 500;
      }
    }
  }
`;
