import * as React from 'react';
import { ListId } from './SchedulerContainer';

type DraggableItemProperites = {
    name: string;
    currentList: ListId;
    originalList: ListId;
    itemClass: string;
    setDraggedItem: (item: DraggableItem | undefined) => void;
    getDraggedItem: () => DraggableItem | undefined;
    setClickedItem: (item: DraggableItem | undefined) => void;
    getClickedItem: () => DraggableItem | undefined;
}

const draggablesAreEqual = (prevProps: DraggableItemProperites, nextProps: DraggableItemProperites): boolean => {
    return (prevProps.name === nextProps.name)  &&
        (prevProps.originalList === nextProps.originalList) &&
        (prevProps.itemClass === nextProps.itemClass);
}

export default class DraggableItem extends React.PureComponent<DraggableItemProperites> {

    handleClick = () => {
        if (!this.props.getClickedItem()) {
            this.props.setClickedItem(this);
            document.addEventListener("mousedown", this.handleOutsideClick);
        }
    }

    handleOutsideClick = (e) => {
        document.removeEventListener("mousedown", this.handleOutsideClick);
        if (!e.target.classList.contains("can-click")) {
            this.props.setClickedItem(undefined);
        }
    }

    handleDragStart = () => {
        if (!this.props.getDraggedItem()) {
            this.props.setDraggedItem(this);
        }
    }

    handleDragEnd = () => {
        if (this.props.getDraggedItem()) {
            this.props.setDraggedItem(undefined);
        }
    }

    render() {
        let className = this.props.itemClass;
        className += " " + this.props.originalList;
        return (
            <div 
                className="draggable-item"
                draggable="true"
                onDragStart={this.handleDragStart}
                onDragEnd={this.handleDragEnd}
                onClick={this.handleClick}
            >
                <div className={className}>
                    {this.props.name}
                </div>
            </div>
        )
    }
}

export { draggablesAreEqual };