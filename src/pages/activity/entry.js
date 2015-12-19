import baseStyle from 'commonStyles/base.less'

class Greeting {
  	toString() {
    	return 'Hello visitor';
  	}

	render(){
  		return <div>123</div>
  	}
}

console.log(new Greeting().render)

export default Greeting