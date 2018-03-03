import React, { Component } from 'react';

const placeholderImage = `data:image/jpeg;base64,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`;

class ImageElement extends Component {
  constructor(props){
    super(props);

    this.dummy = new Image();
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: .3
    }
    
    this.observer = new IntersectionObserver(this.handleImageLoad, options);
  }
  
  state = {
    loading: true,
    opacity: 1,
  };

  componentDidMount() {
    this.observer.observe(this.image);
  }

  setImageRef = e => {
    this.image = e;
  }

  handleImageLoad = (entries, observer) => {
    const isIntersecting = entries && entries[0] && entries[0].isIntersecting;

    if (isIntersecting && this.state.loading) {
      this.dummy.src = this.props.src;
      this.dummy.onload = () => {
        this.setState({ opacity: .1 });
        setTimeout(() => {
          this.setState({ opacity: 1, loading: false })
        }, 200);
      }
    }
  }

  render() {
    const { loading, opacity } = this.state;
    const { alt, className, width, height, src } = this.props;
    const style = {
      width: `${width}px`,
      height: `${height}px`,
      transition: '.2s ease-in-out',
      opacity
    }
    const source = loading ? placeholderImage : src;

    return (
      <img ref={this.setImageRef} className={className} style={style} src={source} alt={alt} />
    )
  }
}

export default ImageElement;
