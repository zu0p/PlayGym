const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const EMAIL = (isClicked, value) => {
  if (isClicked) {
    if (value === '') 
      return true
    if (!emailRegex.test(value))
      return true 
  }
  return false
}

export const ID = (isClicked, value) => {
  if (isClicked) {
    if (value === '') 
      return true
    if (value.length < 6 || value.length > 16) 
      return true
  }
  return false
}

export const PW = (isClicked, value) => {
  if (isClicked) {
    if (value.length < 8 || value.length > 16)
      return true
    
    const eng = value.search(/[a-zA-Z]/g)
    const num = value.search(/[0-9]/gi)
    const spec = value.search(/[`~!@@#$%^&*|₩₩₩'₩";:₩/?]/gi)
    if (num < 0 || eng < 0 || spec < 0)
      return true
  }
  return false
}

export const NAME = (isClicked, value) => {
  if (isClicked) {
    if (value.length < 2 || value.length > 10)
      return true
    if (!/^([a-zA-Z0-9ㄱ-ㅎ|ㅏ-ㅣ|가-힣]).{1,10}$/.test(value))
      return true
  }
  return false
}

export const PHONE = (isClicked, value) => {
  if (isClicked) {
    return true
  }
  return false
}
