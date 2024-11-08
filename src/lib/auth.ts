import { account, OAuthProvider } from './appwrite'

export const loginWithGoogle = async () =>
  await account.createOAuth2Session(
    OAuthProvider.Google,
    'http://localhost:3000/',
    'http://localhost:3000/fail',
  )

export const logoutUser = async () => {
  try {
    await account.deleteSession('current')
  } catch (error) {
    console.log(error)
  }
}

export const getUser = async () => {
  try {
    return await account.get()
  } catch (error) {
    console.log(error)
  }
}
