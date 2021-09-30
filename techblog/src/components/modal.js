import React, { useCallback, useRef, useState } from 'react';
import Modal from 'react-modal';

import '../css/modal.css'

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

const kinds = [
  { id: '1', text:'카테고리 없음' },
  { id: '2', text:'React'},
  { id: '3', text:'Node'},
  { id: '4', text:'JavaScript'}];

const ModalComponent = ({setCategory, category}) => {
  
  const categoryRef = useRef();
  let subtitle;
  const [modalIsOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  }

  const afterOpenModal = () => {
    // references are now sync'd and can be accessed.
    subtitle.style.color = '#f00';
  }

  const closeModal = () => {
    setIsOpen(false);
  }

  const onClick = useCallback(() => {
    // console.log(categoryRef.current.value)
    setCategory(categoryRef.current.value);
  }, [categoryRef])

  // Modal.setAppElement('#modal')

  return (
    <div id="modal" style={{zIndex:'4'}}>
      <button className="btn-modal1" onClick={openModal}>카테고리 선택</button>
      <Modal
        ariaHideApp={false}
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <button className="btn-modal2"onClick={closeModal} >확 인</button>
        <h2 ref={(_subtitle) => (subtitle = _subtitle)}>카테고리 선택</h2>
        <div>선택된 카테고리 : {category}</div>
        <br/>
        {/* <form>
          <input />
          <button>tab navigation</button>
          <button>stays</button>
          <button>inside</button>
          <button>the modal</button>
        </form> */}
        <div class="form-group">
          {/* <label for="exampleFormControlSelect1">Example select</label> */}
          <select ref={categoryRef} class="form-control" id="FormControlSelectModal" onChange={onClick}>
            {kinds.map((k) => (
              <option value={k.text}>{k.text}</option>
            ))}
          </select>
        </div>
      </Modal>
    </div>
  );
}

export default ModalComponent;