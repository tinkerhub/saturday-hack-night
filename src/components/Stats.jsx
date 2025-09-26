"use client";


const Stats = () => {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8 p-4 sm:p-6 md:p-8">
      <div className=" rounded-lg p-3 sm:p-4 md:p-6">
        <div className="text-center">
          <h3 className="text-4xl sm:text-4xl md:text-6xl font-clash font-bold mb-2 sm:mb-4">1600+</h3>
          <p className="text-sm sm:text-base md:text-lg font-clash">Participants</p>
        </div>
      </div>

      <div className="rounded-lg p-3 sm:p-4 md:p-6">
        <div className="text-center">
          <h3 className="text-4xl sm:text-4xl md:text-6xl font-clash font-bold mb-2 sm:mb-4">400+</h3>
          <p className="text-sm sm:text-base md:text-lg font-clash">Projects</p>
        </div>
      </div>

      <div className="rounded-lg p-3 sm:p-4 md:p-6">
        <div className="text-center">
          <h3 className="text-4xl sm:text-4xl md:text-6xl font-clash font-bold mb-2 sm:mb-4">45+</h3>
          <p className="text-sm sm:text-base md:text-lg font-clash">HackNights</p>
        </div>
      </div>

      <div className="rounded-lg p-3 sm:p-4 md:p-6">
        <div className="text-center">
          <h3 className="text-4xl sm:text-4xl md:text-6xl font-clash font-bold mb-2 sm:mb-4">5</h3>
          <p className="text-sm sm:text-base md:text-lg font-clash">Offline HackNights</p>
        </div>
      </div>
    </div>
  );
};

export default Stats;
