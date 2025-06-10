"use client";


const Stats = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 p-8">
      <div className=" rounded-lg p-6">
        <div className="text-center">
          <h3 className="text-6xl font-bold mb-4 text-blue-500">1600+</h3>
          <p className="text-lg text-blue-400">Participants</p>
        </div>
      </div>

      <div className="rounded-lg p-6">
        <div className="text-center">
          <h3 className="text-6xl font-bold mb-4 text-blue-500">400+</h3>
          <p className="text-lg text-blue-400">Projects</p>
        </div>
      </div>

      <div className="rounded-lg p-6">
        <div className="text-center">
          <h3 className="text-6xl font-bold mb-4 text-blue-500">45+</h3>
          <p className="text-lg text-blue-400">HackNights</p>
        </div>
      </div>

      <div className="rounded-lg p-6">
        <div className="text-center">
          <h3 className="text-6xl font-bold mb-4 text-blue-500">5</h3>
          <p className="text-lg text-blue-400">Offline HackNights</p>
        </div>
      </div>
    </div>
  );
};

export default Stats;
