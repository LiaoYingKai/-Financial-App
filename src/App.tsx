import { Button } from '@/components/ui/button';

function App() {
  return (
    <div className="w-full h-full flex items-center justify-center flex-col gap-4">
      <h1 className="text-3xl font-bold underline text-red-300">
        Hello world!
      </h1>
      <Button>Click Me</Button>
    </div>
  );
}

export default App;
