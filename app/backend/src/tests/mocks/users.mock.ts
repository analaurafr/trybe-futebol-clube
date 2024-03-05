const user = {
  id: 1,
  username: 'Admin',
  email: 'admin@admin.com',
  password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW',
  role: 'admin'
};

const login = {
  email: 'admin@admin.com',
  password: 'secret_admin',
}

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsInJvbGUiOiJhZG1pbiIsImVtYWlsIjoiYWRtaW5AYWRtaW4uY29tIiwiaWF0IjoxNzA4NDI4NTUzLCJleHAiOjE3MDkwMzMzNTN9.4xHMbiNRylTBtwLuLs89oA64_LaI9RrcqPrkvJloc8c'


export default {
  user,
  login,
  token,
}
