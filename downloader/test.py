from concurrent.futures import ThreadPoolExecutor, as_completed


class Test:
    def __init__(self, index) -> None:
        self.index = str(index)
        print(self.index)

    def test(self):
        print("test" + self.index)
        print("testtt" + 222)


fs = []
with ThreadPoolExecutor(max_workers=4) as e:
    for i in range(20):
        test = Test(i)
        f = e.submit(test.test)
        fs.append(f)
    _ = as_completed(fs=fs)