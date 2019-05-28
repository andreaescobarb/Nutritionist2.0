Testing:

Controllers

Each controller contains four functions, these are create, update, list, and delete. List does not receive any parameters,
therefore it does not need to be tested.

Foods

Create

Foods can be created with incomplete parameters, such as the following cases:

Case 1, description and image but no name.
{
    "description": "A healthy meal",
    "image": "https://healthyfoods.org/case33.png"
}

Case 2, description but no image and no name.
{
    "description": "A healthy meal"
}

Case 3, image but no description and no name.
{
    "image": "https://healthyfoods.org/case33.png"
}

In all three cases the output will be the following.
{
    "created": true
}

However, no new objects will be added to the Foods table unless a name is included.

Delete

The delete function uses both the name and id fields to find the object that is to be discarded. The following cases have
been recorded.

{
    "id": 5
}

{
    "id": 4,
    "name": "Grilled Chicken"
}

These cases receive the following output.
{
    "deleted": true
}

When the id and/or name of the object cannot be found in the database, the output doesn't change, however,
the contents of the database then remain unchanged.

Update

When updating, an id must be sent along with the parameters that are to be modified. For example,
{
    "id": 3,
    "name": "Taco",
    "description": "Fried tortillas with chicken and guacamole"
}

However, a case has been recorded in which the id is not sent among the parameters, when this happens,
all objects are modified instead. For example,
{
    "name": "Cereal",
    "description": "Milk and cereal"
}

Returns the following,
{
    "updated": true
}

Tags

Create

Tags can be created with incomplete parameters:

{
    "description": "A healthy meal"
}

The output will be the following.
{
    "created": true
}

However, no new objects will be added to the Tags table unless a name is included.

Delete

The delete function uses both the name and id fields to find the object that is to be discarded. The following cases have
been recorded.

{
    "id": 5
}

{
    "id": 4,
    "name": "Snack"
}

These cases receive the following output.
{
    "deleted": true
}

When the id and/or name of the object cannot be found in the database, the output is the same, however,
the contents of the database then remain unchanged.

Update

When updating, an id must be sent along with the parameters that are to be modified. For example,
{
    "id": 3,
    "name": "Lunch",
}

However, a case has been recorded in which the id is not sent among the parameters, when this happens,
all objects are modified instead. For example,
{
    "name": "Snack",
    "description": "Twice a day"
}

Returns the following,
{
    "updated": true
}

Categories

Create

Categories only need one parameter, a description, an empty description like the following,
{
    "description":
}

Will return the following output,
{
    "created": true
}

However, the Categories table will remain unchanged.

Delete

The delete function uses both the description and id fields to find the object that is to be discarded. The following cases have been recorded.

{
    "id": 5
}

{
    "id": 4,
    "description": "Diabetes"
}

These cases receive the following output.
{
    "deleted": true
}

When the id and/or name of the object cannot be found in the database, the output doesn't change, however,
the contents of the database then remain unchanged.

Update

When updating, an id must be sent along with the parameters that are to be modified. For example,
{
    "id": 3,
    "description": "High cholesterol, diabetes"
}

However, a case has been recorded in which the id is not sent among the parameters, when this happens,
all objects are modified instead. For example,
{
    "description": "Low glucose"
}

Returns the following,
{
    "updated": true
}

Roles

Create

Tags can be created with incomplete parameters:

{
    "description": "A healthy meal"
}

{
    "description": "A healthy meal",
    "color": red
}

{
    "color": red
}

The output will be the following.
{
    "created": true
}

However, no new objects will be added to the Roles table unless a name is included.

Delete

The delete function uses both the name and id fields to find the object that is to be discarded. The following cases have
been recorded.

{
    "id": 5
}

{
    "id": 4,
    "name": "Administrator"
}

These cases receive the following output.
{
    "deleted": true
}

When the id and/or name of the object cannot be found in the database, the output is the same, however,
the contents of the database then remain unchanged.

Update

When updating, an id must be sent along with the parameters that are to be modified. For example,
{
    "id": 3,
    "name": "Patient",
    "color": blue
}

However, a case has been recorded in which the id is not sent among the parameters, when this happens,
all objects are modified instead. For example,
{
    "name": "Nutritionist",
    "color": green
}

Returns the following,
{
    "updated": true
}

Users

Create

Users can be created with incomplete parameters:

{
    "name": "Carlos"
    "username": "carlos@gmail.com"
}

{
    "password": "12345"
}

The output will be the following.
{
    "created": true
}

Incomplete objects are added to the Users table.

Delete

The delete function uses both the name and id fields to find the object that is to be discarded. The following cases have
been recorded.

{
    "id": 5
}

{
    "id": 4,
    "name": "Oswal"
}

These cases receive the following output.
{
    "deleted": true
}

When the id and/or name of the object cannot be found in the database, the output is the same, however,
the contents of the database then remain unchanged.

Update

When updating, an id must be sent along with the parameters that are to be modified. For example,
{
    "id": 3,
    "name": "Andrea",
}

However, a case has been recorded in which the id is not sent among the parameters, when this happens,
all objects are modified instead. For example,
{
    "name": "Michelle",
    "username": "michelle@yahoo.com"
}

Returns the following,
{
    "updated": true
}

Entries

Create

Entries can be created with incomplete parameters:

{
    "steps": 15000
}

{
    "water": 4
    "weight": 160
}

The output will be the following.
{
    "created": true
}

Incomplete objects are added to the Entries table.

Delete

The delete function uses the id field to find the object that is to be discarded. The following case has
been recorded.

{
    "id": 5
}

These cases receive the following output.
{
    "deleted": true
}

When the id of the object cannot be found in the database, the output is the same, however,
the contents of the database then remain unchanged.

Update

When updating, an id must be sent along with the parameters that are to be modified. For example,
{
    "id": 3,
    "steps": 1300,
}

However, a case has been recorded in which the id is not sent among the parameters, when this happens,
all objects are modified instead. For example,
{
    "steps": 4000,
    "weight": 150
}

Returns the following,
{
    "updated": true
}

The following three controllers are used to create relations between different objects.

RolesUsers

Create

This method can receive incomplete parameters, such as

{
    "userId": 1
}

{
    "roleId": 3
}

The output will be the following.
{
    "created": true
}

However, incomplete relations are not added to the table.

Delete

The delete function uses both the userId and id fields to find the object that is to be discarded. The following cases have been recorded.

{
    "id": 5
}

{
    "id": 4,
    "userId": 4
}

These cases receive the following output.
{
    "deleted": true
}

When the id of the object cannot be found in the database, the output is the same, however,
the contents of the database then remain unchanged.

Update

When updating, an id must be sent along with the parameters that are to be modified. For example,
{
    "id": 3,
    "userId": 12,
}

However, a case has been recorded in which the id is not sent among the parameters, when this happens,
all objects are modified instead. For example,
{
    "userId": 4,
    "roleId": 5
}

Returns the following,
{
    "updated": true
}

FoodsTags

Create

This method can receive incomplete parameters, such as

{
    "tagId": 1
}

{
    "foodId": 3
}

The output will be the following.
{
    "created": true
}

However, incomplete relations are not added to the table.

Delete

The delete function uses both the foodId and id fields to find the object that is to be discarded. The following cases have been recorded.

{
    "id": 5
}

{
    "id": 4,
    "foodId": 4
}

These cases receive the following output.
{
    "deleted": true
}

When the id of the object cannot be found in the database, the output is the same, however,
the contents of the database then remain unchanged.

Update

When updating, an id must be sent along with the parameters that are to be modified. For example,
{
    "id": 3,
    "foodId": 12,
}

However, a case has been recorded in which the id is not sent among the parameters, when this happens,
all objects are modified instead. For example,
{
    "foodId": 4,
    "tagId": 5
}

Returns the following,
{
    "updated": true
}

CategoriesUser

Create

This method can receive incomplete parameters, such as

{
    "userId": 1
}

{
    "categoriesId": 3
}

The output will be the following.
{
    "created": true
}

However, incomplete relations are not added to the table.

Delete

The delete function uses both the userId and id fields to find the object that is to be discarded. The following cases have
been recorded.

{
    "id": 5
}

{
    "id": 4,
    "userId": 4
}

These cases receive the following output.
{
    "deleted": true
}

When the id of the object cannot be found in the database, the output is the same, however,
the contents of the database then remain unchanged.

Update

When updating, an id must be sent along with the parameters that are to be modified. For example,
{
    "id": 3,
    "userId": 12,
}

However, a case has been recorded in which the id is not sent among the parameters, when this happens,
all objects are modified instead. For example,
{
    "userId": 4,
    "categoriesId": 5
}

Returns the following,
{
    "updated": true
}
