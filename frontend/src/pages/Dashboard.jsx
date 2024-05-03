function Dashboard() {
  return (
    <div className="dashboard-container w-full h-screen flex flex-wrap p-5">
      <div className="w-1/2 h-full flex items-center flex-col">
        <div className="w-full h-1/5">Welcome to Paytm V01</div>
        <div className="w-full flex gap-1 h-2/5">
          <input type="search" className="w-9/12 h-auto" />
          <button className="w-1/5">search</button>
        </div>
        <div className="flex w-full h-2/5 items-center justify-center">
          <ul>
            <li>
              list <button>send</button>
            </li>
            <li>
              list <button>send</button>
            </li>
            <li>
              list <button>send</button>
            </li>
            <li>
              list <button>send</button>
            </li>
            <li>
              list <button>send</button>
            </li>
          </ul>
        </div>
      </div>
      <div className="w-1/2 h-full flex items-center flex-col">
        <div className="w- full h-1/2">
          <p>Hello User</p>
          <img src="" alt="logopfp"></img>
        </div>
        <div className="h-3/5">Dashboard</div>
        <div className="h-1/5">balance</div>
      </div>
    </div>
  );
}

export { Dashboard };
