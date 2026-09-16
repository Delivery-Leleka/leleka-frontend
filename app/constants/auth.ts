export interface ValidationError {
  msg: string;
  icon: string;
}

export const validatePasswordDetailed = (
  v: string,
  capthaOK: boolean
): ValidationError | null => {
  if (!v) return null;

  if (/\s/.test(v) || /[%=+\\/]/.test(v)) {
    return {
      msg: 'Один із символів не є доступним',
      icon: '/icons/Vector.png',
    };
  }

  if (/[^\x20-\x7E]/.test(v)) {
    return {
      msg: 'Пароль має містити латинські літери',
      icon: '/icons/Auto-line-height.png',
    };
  }

  const allowed = /^[A-Za-z0-9!@#$^&*()_\-[\]{}|:;"'<>,.?~]+$/;
  if (!allowed.test(v)) {
    return {
      msg: 'Використовуйте лише латинські літери',
      icon: '/icons/Auto-line-height.png',
    };
  }

  if (v.length < 8) {
    return { msg: 'Занадто короткий пароль', icon: '/icons/Auto-width.png' };
  }

  if (!/[A-Za-z]/.test(v)) {
    return {
      msg: 'Пароль має містити латинські літери',
      icon: '/icons/Auto-line-height.png',
    };
  }

  if (!/[0-9!@#$^&*()_\-[\]{}|:;"'<>,.?~]/.test(v)) {
    return {
      msg: 'Додайте цифри та/або спец. символи',
      icon: '/icons/Plus-cross.png',
    };
  }

  if (/^[A-Za-z0-9]+$/.test(v)) {
    return {
      msg: 'Додайте цифри та/або спец. символи',
      icon: '/icons/error2.png',
    };
  }

  if (!capthaOK && process.env.NODE_ENV !== 'development') {
    return {
      msg: 'Будь ласка, підтвердіть, що ви не робот',
      icon: '/icons/error2.png',
    };
  }

  return null;
};
