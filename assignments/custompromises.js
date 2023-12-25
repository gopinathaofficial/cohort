class CustomPromise {
    constructor(executor) {
      this.status = 'pending';
      this.value = undefined;
      this.reason = undefined;
      this.onResolveCallbacks = [];
      this.onRejectCallbacks = [];
  
      const resolve = (value) => {
        if (this.status === 'pending') {
          this.status = 'fulfilled';
          this.value = value;
          this.onResolveCallbacks.forEach(callback => callback());
        }
      };
  
      const reject = (reason) => {
        if (this.status === 'pending') {
          this.status = 'rejected';
          this.reason = reason;
          this.onRejectCallbacks.forEach(callback => callback());
        }
      };
  
      try {
        executor(resolve, reject);
      } catch (error) {
        reject(error);
      }
    }
  
    then(onFulfilled, onRejected) {
      const newPromise = new CustomPromise((resolve, reject) => {
        const handleFulfilled = () => {
          try {
            const result = onFulfilled ? onFulfilled(this.value) : this.value;
            if (result instanceof CustomPromise) {
              result.then(resolve, reject);
            } else {
              resolve(result);
            }
          } catch (error) {
            reject(error);
          }
        };
  
        const handleRejected = () => {
          try {
            const result = onRejected ? onRejected(this.reason) : this.reason;
            if (result instanceof CustomPromise) {
              result.then(resolve, reject);
            } else {
              resolve(result);
            }
          } catch (error) {
            reject(error);
          }
        };
  
        if (this.status === 'fulfilled') {
          setTimeout(handleFulfilled, 0);
        } else if (this.status === 'rejected') {
          setTimeout(handleRejected, 0);
        } else {
          this.onResolveCallbacks.push(() => setTimeout(handleFulfilled, 0));
          this.onRejectCallbacks.push(() => setTimeout(handleRejected, 0));
        }
      });
  
      return newPromise;
    }
  
    catch(onRejected) {
      return this.then(null, onRejected instanceof Function ? onRejected : undefined);
    }
  
    static resolve(value) {
      return new CustomPromise(resolve => resolve(value));
    }
  
    static reject(reason) {
      return new CustomPromise((resolve, reject) => reject(reason));
    }
  }
  
  
  const promise = new CustomPromise((resolve, reject) => {
    setTimeout(() => {
      const randomNumber = Math.random();
      if (randomNumber > 0.5) {
        resolve('Success!');
      } else {
        reject('Failed!');
      }
    }, 1000);
  });
  
  promise
    .then(result => {
      console.log('Resolved:', result);
      return 'New Value';
    })
    .then(newResult => {
      console.log('Chained Resolved:', newResult);
    })
    .catch(error => {
      console.error('Rejected:', error);
    });
  