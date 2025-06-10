"use client";


const Stats = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 p-8">
      <div className=" rounded-lg p-6">
        <div className="text-center">
          <h3 className="text-6xl font-clash font-bold mb-4">1600+</h3>
          <p className="text-lg font-clash">Participants</p>
        </div>
      </div>

      <div className="rounded-lg p-6">
        <div className="text-center">
          <h3 className="text-6xl font-clash font-bold mb-4">400+</h3>
          <p className="text-lg font-clash">Projects</p>
        </div>
      </div>

      <div className="rounded-lg p-6">
        <div className="text-center">
          <h3 className="text-6xl font-clash font-bold mb-4">45+</h3>
          <p className="text-lg font-clash">HackNights</p>
        </div>
      </div>

      <div className="rounded-lg p-6">
        <div className="text-center">
          <h3 className="text-6xl font-clash font-bold mb-4">5</h3>
          <p className="text-lg font-clash">Offline HackNights</p>
        </div>
      </div>
    </div>
  );
};

export default Stats;
