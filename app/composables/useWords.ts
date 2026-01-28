import type { Word, WordStatus } from '~/types'

const wordsStatus = ref<Map<string, WordStatus>>(new Map())

export function useWords() {
  function getWordStatus(mot: string): WordStatus {
    return wordsStatus.value.get(mot) || 'active'
  }

  function setWordStatus(mot: string, status: WordStatus) {
    wordsStatus.value.set(mot, status)
  }

  function ignoreWord(mot: string) {
    setWordStatus(mot, 'ignored')
  }

  function blacklistWord(mot: string) {
    setWordStatus(mot, 'blacklisted')
  }

  function restoreWord(mot: string) {
    wordsStatus.value.delete(mot)
  }

  function getFilteredWords(words: Word[], showActive = true): Word[] {
    return words.filter((word) => {
      const status = getWordStatus(word.mot)
      return showActive ? status === 'active' : status !== 'active'
    }).map(word => ({
      ...word,
      status: getWordStatus(word.mot)
    }))
  }

  function getManagedWords(words: Word[]): Word[] {
    return words.filter((word) => {
      const status = getWordStatus(word.mot)
      return status === 'ignored' || status === 'blacklisted'
    }).map(word => ({
      ...word,
      status: getWordStatus(word.mot)
    }))
  }

  return {
    wordsStatus,
    getWordStatus,
    setWordStatus,
    ignoreWord,
    blacklistWord,
    restoreWord,
    getFilteredWords,
    getManagedWords
  }
}
