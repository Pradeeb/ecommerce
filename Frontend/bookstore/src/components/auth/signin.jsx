
import bgImage from '../../assets/authbg/signinbg.png';

function signin(){
    return(
        <div   className="bg-center bg-cover bg-no-repeat w-screen h-screen relative"
         style={{ backgroundImage: `url(${bgImage})` }}>
             <div className='mt-36 absolute bg-white w-screen '> 
                 test
            </div> 
        </div>
    )
}

export default signin