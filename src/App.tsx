import { Button } from '@/components/ui/button';
import useCountStore from './store/CountStore';
import ModeToggle from './components/mode-toggle';

function App() {
  const num = useCountStore((store) => store.num);
  const setNumber = useCountStore((store) => store.setNumber);

  return (
    <div className="w-full h-full flex items-center justify-center flex-col gap-4">
      <h1 className="text-2xl">
        Current Number: <span className="font-bold">{num}</span>
      </h1>
      <div className="flex items-center gap-4">
        <Button
          onClick={() => {
            setNumber(num + 1);
          }}
        >
          Click Me +1
        </Button>
        <Button
          onClick={() => {
            setNumber(num - 1);
          }}
        >
          Click Me -1
        </Button>
      </div>
      <ModeToggle />
    </div>
  );
}

export default App;
