const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const EMAIL = value => {
  if (!emailRegex.test(value))
    return true 

  return false
}

export const ID = value => {
  if (value.length < 6 || value.length > 16) 
    return true
  if (value.search(/[`~!@#$%^&*|\\\'\";:\/?]/gi) !== -1) 
    return true
  if (value.search(/\s/) !== -1)
    return true
  if (!/^[a-z]+[a-z0-9]{5,19}$/gi.test(value))
    return true

  return false
}

export const PW = value => {
  if (value.length < 8 || value.length > 16)
    return true
  
  const eng = value.search(/[a-zA-Z]/g)
  const num = value.search(/[0-9]/gi)
  const spec = value.search(/[`~!@@#$%^&*|₩₩₩'₩";:₩/?]/gi)

  if (num < 0 || eng < 0 || spec < 0)
    return true

  return false
}

export const NAME = value => {
  if (value.length < 2 || value.length > 10)
    return true
  if (!/^([a-zA-Z0-9ㄱ-ㅎ|ㅏ-ㅣ|가-힣]).{1,10}$/.test(value))
    return true

  return false
}

export const PHONE = value => {
  if (!/^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/.test(value))
    return true

  return false
}