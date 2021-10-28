export const EMAIL = value => {
  if (value === '') 
    return '이메일은 필수 항목입니다.'

  const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (!emailRegex.test(value)) 
    return '올바른 이메일을 입력해 주세요.'
  
  return ''
}

export const ID = value => {
  if (value === '') 
    return '아이디는 필수 항목입니다.'

  if (value.length < 6 || value.length > 16) 
    return '아이디는 6~16자 사이로 입력해 주세요.'

  if (value.search(/[`~!@#$%^&*|\\\'\";:\/?]/gi) !== -1) 
    return '아이디는 6~16자 사이로 입력해 주세요.'
  // need to find regex to catch spacebars in id
  return ''
}

export const PW = value => {
  if (value.length < 8 || value.length > 16) 
    return '비밀번호는 8~16자 사이로 입력해 주세요.'
    
  const eng = value.search(/[a-zA-Z]/g)
  const num = value.search(/[0-9]/gi)
  const spec = value.search(/[`~!@@#$%^&*|₩₩₩'₩";:₩/?]/gi)
  
  if (num < 0 || eng < 0 || spec < 0) 
    return '영문, 숫자, 특수문자를 포함해 주세요.'
  
  return ''
}

export const NAME = value => {
  if (value.length < 2 || value.length > 10) 
    return '이름은 2~10자 사이로 입력해 주세요.'

  if (!/^([a-zA-Z0-9ㄱ-ㅎ|ㅏ-ㅣ|가-힣]).{1,10}$/.test(value)) 
    return '이름은 한글, 영문, 숫자만 가능합니다.'
  
  return ''
}

export const PHONE = value => {
  return ''
}
