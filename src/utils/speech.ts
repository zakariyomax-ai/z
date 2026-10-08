/**
 * Speech synthesis is completely disabled as requested by the user ("ovozini o'chirib tashla gapirmasin umuman").
 */

class UzbekSpeechManager {
  public subscribeState(_listener: (speaking: boolean) => void): () => void {
    return () => {};
  }

  public getSpeakingState(): boolean {
    return false;
  }

  public speak(_text: string, _options?: unknown) {
    // Disabled completely
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  }

  public stop() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  }
}

export const uzbekSpeech = new UzbekSpeechManager();
