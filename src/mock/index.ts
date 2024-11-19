import Mock from 'mockjs'

// 设置响应延时
Mock.setup({
  timeout: '300-600'
})

interface LoginBody {
  username: string
  password: string
}

// 用户相关接口
Mock.mock(/\/api\/user\/login/, 'post', (options: { body: string }) => {
  console.log('Mock login API called', options)
  const { username, password } = JSON.parse(options.body) as LoginBody
  if (username === 'admin' && password === '123456') {
    return {
      code: 200,
      message: '登录成功',
      data: {
        token: 'mock-token-' + Mock.Random.guid()
      }
    }
  }
  return {
    code: 401,
    message: '用户名或密码错误'
  }
})

Mock.mock(/\/api\/user\/info/, 'get', () => {
  console.log('Mock user info API called')
  return {
    code: 200,
    message: '获取用户信息成功',
    data: {
      name: 'Admin',
      avatar: Mock.Random.image('100x100'),
      roles: ['admin'],
      permissions: ['system:user:list', 'system:user:create', 'system:user:edit', 'system:user:delete']
    }
  }
})

// Dashboard 统计数据
Mock.mock(/\/api\/dashboard\/statistics/, 'get', () => {
  return {
    code: 200,
    message: '获取统计数据成功',
    data: {
      userCount: Mock.Random.integer(1000, 9999),
      visitCount: Mock.Random.integer(5000, 9999),
      messageCount: Mock.Random.integer(50, 100),
      todoCount: Mock.Random.integer(5, 20)
    }
  }
})

// 用户管理接口
Mock.mock(/\/api\/system\/users/, 'get', () => {
  return {
    code: 200,
    message: '获取用户列表成功',
    data: {
      total: 100,
      list: Array(10).fill(null).map(() => ({
        id: Mock.Random.id(),
        username: Mock.Random.name(),
        email: Mock.Random.email(),
        phone: Mock.mock('@string("number", 11)'),
        status: Mock.Random.boolean(),
        createTime: Mock.Random.datetime()
      }))
    }
  }
}) 