import React from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { SingleOrder } from './SingleOrder';
import { Order, OrderStatus } from './types';
import { statusConfig } from './config';

type OrderCategoryProps = {
  status: OrderStatus;
  orders: Order[];
};

export function OrderCategory({ status, orders }: OrderCategoryProps) {
  return (
    <Droppable droppableId={status}>
      {(provided) => (
        <div
          {...provided.droppableProps}
          ref={provided.innerRef}
          className={`p-4 rounded-lg ${statusConfig[status].color}`}
        >
          <h2 className="font-semibold mb-2 flex items-center">
            {React.createElement(statusConfig[status].icon, { className: "mr-2" })}
            {status.replace('_', ' ')}
          </h2>
          {orders.map((order, index) => (
            <Draggable key={order.id} draggableId={order.id} index={index}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                >
                  <SingleOrder order={order} icon={statusConfig[status].icon} />
                </div>
              )}
            </Draggable>
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
}