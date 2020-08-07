import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Table, Pagination } from 'antd'

import { listUser } from 'modules/user/actions'
import {
  selectUserList,
  selectPage,
  selectUserTotalSize,
} from 'modules/user/selectors'

const UserList = () => {
  const dispatch = useDispatch()
  const users = useSelector(selectUserList)
  const totalSize = useSelector(selectUserTotalSize)
  const page = useSelector(selectPage)

  const columns = [
    {
      title: 'Full Name',
      key: 'fullname',
      render: (item) => item.firstName + ' ' + item.lastName,
    },
    {
      title: 'Telephone Number',
      dataIndex: 'telephoneNumber',
      key: 'telephoneNumber',
    },
    {
      title: 'Full Address',
      dataIndex: 'fullAddress',
      key: 'fullAddress',
    },
    {
      title: 'SSN',
      key: 'ssn',
      render: (item) => '******',
    },
  ]

  useEffect(() => {
    dispatch(listUser({ page: 1, per_page: 10 }))
  }, [dispatch])

  const handlePage = (value) => {
    dispatch(listUser({ page: value, per_page: 10 }))
  }

  return (
    <>
      <Table
        columns={columns}
        dataSource={users}
        rowKey='id'
        pagination={false}
      />
      <Pagination
        total={totalSize}
        onChange={handlePage}
        current={page}
        pageSize={10}
        style={{ marginTop: '10px' }}
      />
    </>
  )
}

export default UserList
