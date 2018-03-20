export abstract class CustomLoadableComponents<T extends CustomLoadableComponents<T>>
{
  private LOAD_TIMEOUT: number = 30000;
  private REFRESH_RATE: number = 2;

  public get(): CustomLoadableComponents<T> {
    try {
      browser.waitUntil(this.isLoaded, this.LOAD_TIMEOUT, "TimeoutException");
      return this;
    } catch (ex) {
      console.log('Error during page load: ' + ex.message);
      this.load();
    }
    return this;
  }

  protected abstract load(): void;
  protected abstract isLoaded(): boolean;

  private async waitForLoad<T>(pageLoadCondition: () => boolean): Promise<void> {
    await browser.waitUntil(pageLoadCondition);
  }
}