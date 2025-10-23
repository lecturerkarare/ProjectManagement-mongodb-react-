import spinnerSVG from '../assets/images/spinner4.svg';


export function Spinner() {
    return (
      <div
        style={{
          width: '100%', 
          height: '100%', 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          marginTop:'-20px'
        }}
      >
        <div
          style={{
            width: 100,
            height: 100,
            backgroundImage: `url(${spinnerSVG})`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            animation: 'spin 1s linear infinite',
          }}
        />
      </div>
    );
  }