import { Component } from 'react';
import { Overlay, Modal } from './ModalWindow.styled';

export class ModalWindow extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.pressEsc);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.pressEsc);
  }

  pressEsc = evt => {
    if (evt.code === 'Escape') {
      this.props.toggleModal();
    }
  };

  handleClick = evt => {
    if (evt.target === evt.currentTarget) {
      this.props.toggleModal();
    }
  };

  render() {
    const { imageURL, imageTags } = this.props;

    return (
      <Overlay onClick={this.handleClick}>
        <Modal>
          <img src={imageURL} alt={imageTags} />
        </Modal>
      </Overlay>
    );
  }
}
