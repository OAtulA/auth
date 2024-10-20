

function Close() {
    setTimeout(() => {
        // close the window
        window.close();
    }, 2000);
  return (<>
  <title>Close</title>
    <div style={{fontSize:"4rem"}}>Closing in a second</div>
    </>
  )
}

export default Close