let {createClass,PropTypes, Component} = React;
let { render} = ReactDOM;

const Star = ({ selected=false, onClick=f=>f }) => {
	 return	 (
		 <div className={(selected) ? "star selected" : "star"}
			onClick={onClick}>    
		 </div>
	 );
}
Star.propTypes = {
    selected: PropTypes.bool,
    onClick: PropTypes.func
}

const StarRating = createClass({
  displayName: 'StarRating',
  propTypes: {
    totalStars: PropTypes.number
  }
  ,
  getDefaultProps() {
    return {
      totalStars: 5        
    }    
  },
    
  render() {
    const {totalStars} = this.props
    const {starsSelected, onClick} = this.props
    return (
		  <div className="star-rating">
			{[...Array(totalStars)].map((n, i) =>
				 <Star key={i}
				   selected={i<starsSelected}
				   onClick={onClick(i+1)}
				 />                
			)}           
			<p>{starsSelected} of {totalStars} stars</p>
		  </div>
      );
  }
});

const ColorList = ({ colors=[], onClick }) => {
	return (
		<div className="color-list">
			{(colors.length === 0) ?
				<p>No Colors Listed. (Add a Color)</p> :
				colors.map(color =>                
					<Color key={color.id} {...color} onClick={(rating) => onClick(color,rating)}/> 
				)
			}
		</div>
	);
}

const Color = ({ title, color, rating=0 }) =>   {
 return	 ( 	<div>
			 <section className="color">
				 <h1>{title}</h1>
				 <div className="color"
					 style={{ backgroundColor: color }}>
				 </div>
				 <div>
					 <StarRating starsSelected={rating} onClick={this.props.onClick}/>
				 </div>
			 </section>
		</div>
	 );
 }
 
class App extends Component {
    constructor(props) {
		super(props)        
		this.state = {
			    colors: [
					{            
						"id": "0175d1f0-a8c6-41bf-8d02-df5734d829a4",
						"title": "ocean at dusk",
						"color": "#00c4e2",
						"rating": 5
					},
					{
						"id": "83c7ba2f-7392-4d7d-9e23-35adbe186046",
						"title": "lawn",
						"color": "#26ac56",
						"rating": 3
					},        
					{ 
						"id": "a11e3995-b0bd-4d58-8c48-5e49ae7f7f23",
						"title": "bright red",
						"color": "#ff0000",
						"rating": 0
					}
				]       
		}    
	}
	onChange(id,starsSelected) {
		//this.setState({colors,})
		console.log(`id: ${id}, starsSelected: ${starsSelected} `);
	}
   
	render() {        
		const { colors } = this.state
		return (
			<div className="app">
				<ColorList colors={colors} onClick={this.onChange} />
			</div>
        );
    }
}

render(   
  <App />,
  document.getElementById('root')
)