function ChestsDesc({ amount }) {

    return (
        <div style={{ position: 'relative' }} className='svip-perms-info'>
            <p>Po zakupie otrzymasz <span style={{ color: 'goldenrod' }}>{amount} Magicznych Skrzynek</span> które będziesz mógł odrazu odebrać
                na serwerze pod komendą /odbierz</p>
            {amount === 16 && (
                <div style={{
                    backgroundImage: `url('http://localhost:8000/images/Chest.png')`,
                    backgroundSize: 'cover',
                    width: '120px',
                    height: '120px',
                    margin: '0 auto',
                    marginTop: '35px'
                }}></div>
            )}
            {amount === 32 && (
                <>
                    <div style={{
                        backgroundImage: `url('http://localhost:8000/images/Chest.png')`,
                        backgroundSize: 'cover',
                        width: '120px',
                        height: '120px',
                        margin: '0 auto',
                        marginTop: '35px',
                        position: 'absolute',
                        left: '140px',
                        zIndex: 2,
                        // bottom: '30px'
                    }}></div>
                    <div style={{
                        backgroundImage: `url('http://localhost:8000/images/Chest.png')`,
                        backgroundSize: 'cover',
                        width: '120px',
                        height: '120px',
                        margin: '0 auto',
                        marginTop: '35px',
                        position: 'absolute',
                        left: '200px',
                        // bottom: '0px'
                    }}></div>
                </>
            )}
            {amount === 64 && (
                <>
                    <div style={{
                        backgroundImage: `url('http://localhost:8000/images/Chest.png')`,
                        backgroundSize: 'contain',
                        width: '120px',
                        height: '120px',
                        position: 'absolute',
                        left: '160px',
                        top: '105px',
                        zIndex: 1,
                    }}></div>
                    <div style={{
                        backgroundImage: `url('http://localhost:8000/images/Chest.png')`,
                        backgroundSize: 'contain',
                        width: '120px',
                        height: '120px',
                        position: 'absolute',
                        left: '140px',
                        top: '155px',
                        zIndex: 2,
                    }}></div>
                    <div style={{
                        backgroundImage: `url('http://localhost:8000/images/Chest.png')`,
                        backgroundSize: 'contain',
                        width: '120px',
                        height: '120px',
                        position: 'absolute',
                        left: '217px',
                        top: '130px',
                        zIndex: 0
                    }}></div>
                </>
            )}
            {amount === 128 && (
                <>
                    <div style={{
                        backgroundImage: `url('http://localhost:8000/images/Chest.png')`,
                        backgroundSize: 'contain',
                        width: '80px',
                        height: '80px',
                        position: 'absolute',
                        left: '175px',
                        top: '120px',
                        zIndex: 1,
                    }}></div>
                    <div style={{
                        backgroundImage: `url('http://localhost:8000/images/Chest.png')`,
                        backgroundSize: 'contain',
                        width: '80px',
                        height: '80px',
                        position: 'absolute',
                        left: '225px',
                        top: '130px',
                        zIndex: 0,
                    }}></div>
                    <div style={{
                        backgroundImage: `url('http://localhost:8000/images/Chest.png')`,
                        backgroundSize: 'contain',
                        width: '80px',
                        height: '80px',
                        position: 'absolute',
                        left: '160px',
                        top: '155px',
                        zIndex: 2,
                    }}></div>
                    <div style={{
                        backgroundImage: `url('http://localhost:8000/images/Ender_Chest.png')`,
                        backgroundSize: 'contain',
                        width: '90px',
                        height: '90px',
                        position: 'absolute',
                        left: '215px',
                        top: '160px',
                        zIndex: 3,
                    }}></div>
                </>
            )}
            {amount === 256 && (
                <>
                    <div style={{
                        backgroundImage: `url('http://localhost:8000/images/Chest.png')`,
                        backgroundSize: 'contain',
                        width: '75px',
                        height: '75px',
                        position: 'absolute',
                        left: '180px',
                        top: '120px',
                        zIndex: 1,
                    }}></div>
                    <div style={{
                        backgroundImage: `url('http://localhost:8000/images/Ender_Chest.png')`,
                        backgroundSize: 'contain',
                        width: '75px',
                        height: '75px',
                        position: 'absolute',
                        left: '160px',
                        top: '140px',
                        zIndex: 2,
                    }}></div>
                    <div style={{
                        backgroundImage: `url('http://localhost:8000/images/Ender_Chest.png')`,
                        backgroundSize: 'contain',
                        width: '75px',
                        height: '75px',
                        position: 'absolute',
                        left: '240px',
                        top: '125px',
                        zIndex: 0,
                    }}></div>
                    <div style={{
                        backgroundImage: `url('http://localhost:8000/images/Chest.png')`,
                        backgroundSize: 'contain',
                        width: '70px',
                        height: '70px',
                        position: 'absolute',
                        left: '220px',
                        top: '155px',
                        zIndex: 3,
                    }}></div>
                    <div style={{
                        backgroundImage: `url('http://localhost:8000/images/Chest.png')`,
                        backgroundSize: 'contain',
                        width: '70px',
                        height: '70px',
                        position: 'absolute',
                        left: '160px',
                        top: '175px',
                        zIndex: 3,
                    }}></div>
                </>
            )}
            {amount === 512 && (
                <>
                    <div style={{
                        backgroundImage: `url('http://localhost:8000/images/Chest.png')`,
                        backgroundSize: 'contain',
                        width: '75px',
                        height: '75px',
                        position: 'absolute',
                        left: '180px',
                        top: '118px',
                        zIndex: 1,
                    }}></div>
                    <div style={{
                        backgroundImage: `url('http://localhost:8000/images/Ender_Chest.png')`,
                        backgroundSize: 'contain',
                        width: '75px',
                        height: '75px',
                        position: 'absolute',
                        left: '160px',
                        top: '138px',
                        zIndex: 2,
                    }}></div>
                    <div style={{
                        backgroundImage: `url('http://localhost:8000/images/Ender_Chest.png')`,
                        backgroundSize: 'contain',
                        width: '75px',
                        height: '75px',
                        position: 'absolute',
                        left: '240px',
                        top: '123px',
                        zIndex: 1,
                    }}></div>
                    <div style={{
                        backgroundImage: `url('http://localhost:8000/images/Chest.png')`,
                        backgroundSize: 'contain',
                        width: '70px',
                        height: '70px',
                        position: 'absolute',
                        left: '220px',
                        top: '153px',
                        zIndex: 3,
                    }}></div>
                    <div style={{
                        backgroundImage: `url('http://localhost:8000/images/Chest.png')`,
                        backgroundSize: 'contain',
                        width: '70px',
                        height: '70px',
                        position: 'absolute',
                        left: '160px',
                        top: '173px',
                        zIndex: 3,
                    }}></div>
                    <div style={{
                        backgroundImage: `url('http://localhost:8000/images/Ender_Chest.png')`,
                        backgroundSize: 'contain',
                        width: '70px',
                        height: '70px',
                        position: 'absolute',
                        left: '210px',
                        top: '178px',
                        zIndex: 3,
                    }}></div>
                </>
            )}
        </div>
    )
}

export default ChestsDesc
