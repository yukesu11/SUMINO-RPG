/*:============================================================================

  @target MZ

  @author Chaucer

  @plugindesc | Collision Altering Plugin : Version - 1.2.0 |
  * This plugin completely changes collision detection and adds pixel movement.

  @url http://rosedale-studios.com

  @help
* ╔════════════════════════════════════╗
* ║ ()()                                                              ()() ║
* ║ (^.^)                    - Rosedale Studios -                    (^.^) ║
* ║c(")(")                                                          (")(")ↄ║
* ╚════════════════════════════════════╝

*============================================================================
*  Instructions :
*============================================================================

*   Without "Rosedale_CollisionAlteringGUI.js" this plugin is virtually
* useless, as you will not be able to setup colliders! See
* Rosedale_CollisionAlteringGUI's help file for information on how to use!

*   This plugins is basically plug and play aside from note tags/comments
* to enable pixel movement/collision alteration. If the note tag is not
* present on a map default map movement/collision detection will be used.

*----------------------------------------------------------------------------
* Compatibility List :
*----------------------------------------------------------------------------

*    -------------------------------------------------------------------------
*    TSR_Mirror.js :
*    -------------------------------------------------------------------------
*      As of version 1.1.0 this plugin is now compatible with TSR_Mirror.js,
*    however in order for these plugins to work together TSR_Mirror.js must
*    be placed BELOW this plugin! If it is not below this plugin it WILL
*    cause issues!
*
*    -------------------------------------------------------------------------
*    OcRam_Passagaes.js
*    -------------------------------------------------------------------------
*        As of version 1.1.0 this plugin is now compatible with
*      OcRam_Passages.js, however as OcRam_Passages.js overwrites an
*      important function required to trigger events, OcRam_Passages.js
*      must be placed BELOW this plugin! If it is not placed below this
*      plugin it will cause issues when trying to trigger events!

*----------------------------------------------------------------------------
* 8 Directional Sprite Sheets:
*----------------------------------------------------------------------------
*
*    When enabling 8 directional sprite sheets on a character, please follow
*    the format specified below. In this example, we'll assume this sheet
*    uses the "$" symbol in it's name( or only contains a single actor ).
*    Assuming the arrows in each box are the direction the player faces
*    in each frame of the sprite sheet.
*
*    Default Spritesheet:                 8 Direction Sprite Sheet:
*   ┌─┬─┬─┐                               ┌─┬─┬─┐
*   │↓│↓│↓│                               │↙│↙│↙│
*   ├─┼─┼─┤                               ├─┼─┼─┤
*   │←│←│←│                               │↓│↓│↓│
*   ├─┼─┼─┤                               ├─┼─┼─┤
*   │→│→│→│                               │↘│↘│↘│
*   ├─┼─┼─┤                               ├─┼─┼─┤
*   │↑│↑│↑│                               │←│←│←│
*   └─┴─┴─┘                               ├─┼─┼─┤
*                                                │→│→│→│
*                                                ├─┼─┼─┤
*                                                │↖│↖│↖│
*                                                ├─┼─┼─┤
*                                                │↑│↑│↑│
*                                                ├─┼─┼─┤
*                                                │↗│↗│↗│
*                                                └─┴─┴─┘
*
*----------------------------------------------------------------------------
* Map Note Tags:
*----------------------------------------------------------------------------

*  ╔════════════╦══════════════════════╗
*  ║ Note Tag :             ║ <pixel>                                    ║
*  ╠════════════╬══════════════════════╣
*  ║ Description :          ║ Enable pixel movement on map with this tag.║
*  ╠════════════╩══════════════════════╣
*  ║ Examples :                                                           ║
*  ╠═══════════════════════════════════╣
*  ║ <pixel_movement>                                                     ║
*  ╚═══════════════════════════════════╝

*----------------------------------------------------------------------------
* Actor Note Tags:
*----------------------------------------------------------------------------

*  ╔════════════╦══════════════════════╗
*  ║ Note Tag :             ║ <8dir>                                     ║
*  ╠════════════╬══════════════════════╣
*  ║ Description :          ║ With this note tag attached, the actor     ║
*  ║                        ║ will use an 8 directoinal sprite sheet!    ║
*  ╠════════════╩══════════════════════╣
*  ║ Examples :                                                           ║
*  ╠═══════════════════════════════════╣
*  ║ <8dir>                                                               ║
*  ╚═══════════════════════════════════╝

*----------------------------------------------------------------------------
* Event Comments:
*----------------------------------------------------------------------------

*  ╔════════════╦══════════════════════╗
*  ║ Comment :              ║ <hitbox: X, Y, SIZE>                       ║
*  ╠════════════╬══════════════════════╣
*  ║                        ║ Customize the hitbox for the event that    ║
*  ║ Description :          ║ this comment is attached to. Each argument ║
*  ║                        ║ must be seperated with a comma ",".        ║
*  ╠════════════╩══════════════════════╣
*  ║ Arguments :                                                          ║
*  ╠═══════════════════════════════════╣
*  ║                                                                      ║
*  ║ X : The offset x position of the new hitbox                          ║
*  ║                                                                      ║
*  ║ Y : The offset y position of the new hitbox                          ║
*  ║                                                                      ║
*  ║ SIZE : Both the width AND height of the hitbox.                      ║
*  ║                                                                      ║
*  ╠═══════════════════════════════════╣
*  ║ Examples :                                                           ║
*  ╠═══════════════════════════════════╣
*  ║ <hitbox : 0, 6, 24>                                                  ║
*  ║ <hitbox: 0, 3, 12>                                                   ║
*  ║ <hitbox:5,5,48>                                                      ║
*  ╚═══════════════════════════════════╝

*  ╔════════════╦══════════════════════╗
*  ║ Comment :              ║ <8dir>                                     ║
*  ╠════════════╬══════════════════════╣
*  ║ Description :          ║ With this comment attached, the event      ║
*  ║                        ║ will use an 8 directoinal sprite sheet!    ║
*  ╠════════════╩══════════════════════╣
*  ║ Examples :                                                           ║
*  ╠═══════════════════════════════════╣
*  ║ <8dir>                                                               ║
*  ╚═══════════════════════════════════╝

*----------------------------------------------------------------------------
* Move Route Script Call:
*----------------------------------------------------------------------------

*  ╔════════════╦══════════════════════╗
*  ║ Script Call :          ║ this.setDestination( X, Y )                ║
*  ╠════════════╬══════════════════════╣
*  ║                        ║ Set a destination for a character to start ║
*  ║ Description :          ║ walking to, the player will walk directly  ║
*  ║                        ║ to the destination( off grid ), and with   ║
*  ║                        ║ no path finding used. Collision detection  ║
*  ║                        ║ will be applied, if a collision occurs     ║
*  ║                        ║ the character will attempt to slide around ║
*  ║                        ║ any obstacles, if the character is unable  ║
*  ║                        ║ to continue moving, the move will be       ║
*  ║                        ║ cancelled.                                 ║
*  ╠════════════╩══════════════════════╣
*  ║ Arguments :                                                          ║
*  ╠═══════════════════════════════════╣
*  ║                                                                      ║
*  ║ X : The X coordinate the character will attempt to move to           ║
*  ║                                                                      ║
*  ║ Y : The Y coordinate the character will attempt to move to           ║
*  ║                                                                      ║
*  ╠═══════════════════════════════════╣
*  ║ Examples :                                                           ║
*  ╠═══════════════════════════════════╣
*  ║ this.setDestination( 3, 8 )                                          ║
*  ║ this.setDestination( 14, 8 )                                         ║
*  ╚═══════════════════════════════════╝

*----------------------------------------------------------------------------
* Script Call:
*----------------------------------------------------------------------------

*  ╔════════════╦══════════════════════╗
*  ║ Script Call :          ║ subject.distanceTo( CHARACTER )            ║
*  ╠════════════╬══════════════════════╣
*  ║ Description :          ║ return the distance in tiles, between the  ║
*  ║                        ║ CHARACTER and the subject.                 ║
*  ╠════════════╩══════════════════════╣
*  ║ Arguments :                                                          ║
*  ╠═══════════════════════════════════╣
*  ║                                                                      ║
*  ║ CHARACTER : The character to check the distance between              ║
*  ║                                                                      ║
*  ╠═══════════════════════════════════╣
*  ║ Examples :                                                           ║
*  ╠═══════════════════════════════════╣
*  ║ $gamePlayer.distanceTo( $gameMap.event( 1 ) ) <= 1                   ║
*  ║ $gameMap.event( 3 ).distanceTo( $gameMap.event( 10 ) ) <= 1          ║
*  ╚═══════════════════════════════════╝

*============================================================================
*  Terms Of Use :
*============================================================================

*   This Plugin may be used commercially, or non commercially. This plugin may
*  be extended upon. This plugin may NOT be shared, or passed to others
*  who have not purchased this product.

*============================================================================
*  Version History :
*============================================================================

*  ● Version : 1.0.0
*  ● Date : 20/01/2023
*    ★ Release.

* ● Version : 1.1.0
* ● Date : 07/11/2023
*   ★ Add - parallax map collisions
*   ★ Add - support for counter tags
*   ★ Add - support for terrain tags
*   ★ Add - support for damage floors
*   ★ Add - support TSR_Mirror.js plugin
*   ★ Add - support OcRam_Passagaes.js plugin
*   ★ Add - function to check distance between two events.
*   ★ Add - function to move to a destination( off grid ).
*   ★ Add - 8 direction spritesheets for player, followers, and events.
*   ✩ Fix - below characters priority prevents trigger by action button.
*   ✩ Fix - autorun events not starting after page switch.
*   ✩ Fix - event dialog test crashes game.

* ● Version : 1.1.1
* ● Date : 07/14/2023
*   ✩ Fix - parallax colliders not divisible by tile size being misplaced.

* ● Version : 1.2.0
* ● Date : 24/07/2023
*   ★ Add - Jumpable colliders( I.E. jumping off cliffs ).
*   ★ Add - 8 direction notes/comments now read if map is not pixel movement.
*   ✩ Fix - 8 direction support for full size sprite sheets.
*   ✩ Fix - issue with events colliding with invisible followers.

*============================================================================
*  Contact Me :
*============================================================================

*  If you have questions, about this plugin, or commissioning me, or have
*  a bug to report, please feel free to contact me by any of the below
*  methods.

*  website : https://www.rosedale-studios.com
*  rmw : https://forums.rpgmakerweb.com/index.php?members/chaucer.44456
*  youtube : https://www.youtube.com/channel/UCYA4VU5izmbQvnjMINssshQ/videos
*  email : chaucer(at)rosedale-studios(dot)com
*  discord : chaucer#7538
*  skypeId : chaucer1991

*============================================================================

* @param debugMode
* @text Debug Mode
* @desc In debug mode colliders for characters, and any colliders near the player will be rendered on screen.
* @default false
* @type boolean

* @param enable8Dir
* @text Enable 8 directonal movement
* @desc Should the player be able to move in diagonally.
* @default true
* @type boolean

* @param tractionRegions
* @text Traction Regions
* @desc specify traction based on region, this allows creating icey surfaces
* @default []
* @type struct<RegionTraction>[]

* @param playerCollider
* @text Player Collider
* @desc Specify the size and postion of the collider.
* @default {"x":"0","y":"0","radius":"24"}
* @type struct<Circle>

* @param jumpSe
* @text Edge Jump SE
* @desc Sound effect played when a character jumps off an edge.
* @default {"name":"","volume":"90","pitch":"100","pan":"0"}
* @type struct<Audio>

* @param noJumpRegion
* @text No Jump Region
* @desc Specify a region that the player will not be able to jump to( -1 to disable ).
* @default -1
* @type number
* @min -1
* @max 255

 * @param jumpEnabledSwitch
 * @text The game switch that enables jumping.
 * @desc Specify a switch that, when enabled, will allow the player to jump.
 * @default 0
 * @type number
 * @min 0
 *
*/

/*~struct~Audio:

* @param name
* @text File
* @desc The name of the sound effect.
* @default
* @type file
* @dir /audio/se/

* @param volume
* @text Volume
* @desc Volume level of the sound effect.
* @default 90
* @type number
* @min 0
* @max 100

* @param pitch
* @text Pitch
* @desc The pitch of the sound effect.
* @default 100
* @type number
* @min 50
* @max 150

* @param pan
* @text Pan
* @desc The pan of the volume.
* @default 0
* @type number
* @min -100
* @max 100
*/

/*~struct~RegionTraction:

* @param regionId
* @text Region ID
* @desc The id of the region that will have traction altering effects.
* @default 0
* @type number
* @min 1
* @max 255

* @param traction
* @text Traction
* @desc How slippery this region the lower the number the more slippery.
* @default 1
* @type number
* @min 0.0001
* @max 1.0000
* @decimals 4

*/

/*~struct~Circle:

* @param x
* @text X
* @desc the offset x position of the circle.
* @default 0
* @type number
* @min -100;
* @max 100;

* @param y
* @text Y
* @desc the offset y position of the circle.
* @default 0
* @type number
* @min -100;
* @max 100;

* @param radius
* @text Radius
* @desc the radius of the circle.
* @default 24
* @type number
* @min 6;
* @max 100;

*/

//=============================================================================
var Imported = Imported || {};
Imported['Collision Altering Plugin'.toUpperCase()] = true;
//=============================================================================
var Chaucer = Chaucer || {};
Chaucer.CAP = {};
//=============================================================================

//=============================================================================
// Math :
//=============================================================================


//=============================================================================
Math.radToDeg = function( radians )
{ // change radians to degrees.
//=============================================================================

  return radians * 180 / Math.PI;

}

//=============================================================================
Math.degToRad = function( degrees )
{ // change degrees to radians.
//=============================================================================

  return degrees * Math.PI / 180;

}

//=============================================================================
class Vector2
{ // Vector2

//=============================================================================
constructor( x = 0, y = 0 )
{ // Called on object creation.
//=============================================================================

  const type = x.constructor.name;
  if ( Vector2.isArray( x ) ) {
    y = x[1];
    x = x[0];
  } else if ( Vector2.isObject( x ) ) {
    y = x.y;
    x = x.x;
  }

  this.x = x;
  this.y = y;

}

//=============================================================================
// PROPERTIES :
//=============================================================================

//=============================================================================
get x()
{ // return the value of x for this object.
//=============================================================================

  return this._x || 0;

}

//=============================================================================
set x( value )
{ // set the value of x for this object.
//=============================================================================

  this._x = value;

}

//=============================================================================
get y()
{ // return the value of y for this object.
//=============================================================================

  return this._y || 0;

}

//=============================================================================
set y( value )
{ // set the value of y for this object.
//=============================================================================

  this._y = value;

}

//=============================================================================
get length()
{ // return the length( non square root ).
//=============================================================================

  if ( this.x == 0 && this.y == 0 ) return 0;
  if ( this.x == 0 && this.y != 0 ) return this.y * this.y;
  if ( this.x != 0 && this.y == 0 ) return this.x * this.x;

  return this.x * this.x + this.y * this.y;

}

//=============================================================================
get magnitude()
{ // return the magnitude of the vector.
//=============================================================================

  return Math.sqrt( this.length );

}

//=============================================================================
set magnitude( value )
{ // return the magnitude of the sprite.
//=============================================================================

  const radians = this.radians - Math.PI / 2;
  let nx = Math.cos( radians );
  let ny = Math.sin( radians );

  if ( Math.abs( nx ) < Number.EPSILON ) nx = 0;
  if ( Math.abs( ny ) < Number.EPSILON ) ny = 0;

  this.x = nx * value;
  this.y = ny * value;

}

//=============================================================================
get radians()
{ // return the angle of the vector in radians.
//=============================================================================

  return Math.atan2( this.y, this.x ) + Math.PI / 2;

}

//=============================================================================
set radians( value )
{ // set the angle of this vector in radians.
//=============================================================================

  const magnitude = this.magnitude;
  const angle = value - Math.PI / 2;

  let nx = Math.cos( angle );
  let ny = Math.sin( angle );

  if ( Math.abs( nx ) < Number.EPSILON ) nx = 0;
  if ( Math.abs( ny ) < Number.EPSILON ) ny = 0;

  this.x = nx * magnitude;
  this.y = ny * magnitude;

}

//=============================================================================
get angle()
{ // return the angle of the vector in radians.
//=============================================================================

  return Math.radToDeg( this.radians );

}

//=============================================================================
set angle( value )
{ // set the angle of this vector in radians.
//=============================================================================

  this.radians = Math.degToRad( value );

}

//=============================================================================
// PROTOTYPE :
//=============================================================================

//=============================================================================
set( x, y )
{ // set the x and y value of the vector.
//=============================================================================

  this.x = x;
  this.y = y;

}

//=============================================================================
// STATIC :
//=============================================================================

//=============================================================================
static zero()
{ // return a blank vector.
//=============================================================================

  return new Vector2( 0, 0 );

}

//=============================================================================
static up()
{ // return a vector facing up.
//=============================================================================

  return new Vector2( 0, -1 );

}

//=============================================================================
static down()
{ // return a vector facing down.
//=============================================================================

  return new Vector2( 0, 1 );

}

//=============================================================================
static right()
{ // return a new vector facing right.
//=============================================================================

  return new Vector2( 1, 0 );

}

//=============================================================================
static left()
{ // return a new vector facing left.
//=============================================================================

  return new Vector2( -1, 0 );

}

//=============================================================================
static isArray( value )
{ // return if the value is an array.
//=============================================================================

  return value.constructor.name == 'Array';

}

//=============================================================================
static isObject( value )
{ // return if the value is a vector or point or object.
//=============================================================================

  const type = value.constructor.name;

  if ( type == 'Point' ) return true;
  if ( type == 'Object' ) return true;
  if ( type == 'Vector2' ) return true;

  return false;

}

//=============================================================================
  static round( vec2 )
  { // return the vector2 with rounded values.
//=============================================================================

    return new Vector2( Math.round( vec2.x ), Math.round( vec2.y ) );

  }

//=============================================================================
static add( vec2a, vec2b )
{ // add two vector2's together.
//=============================================================================

  const x = vec2a.x + vec2b.x;
  const y = vec2a.y + vec2b.y;

  return new Vector2( x, y );

}

//=============================================================================
static subtract( vec2a, vec2b )
{ // add two vector2's together.
//=============================================================================

  const x = vec2a.x - vec2b.x;
  const y = vec2a.y - vec2b.y;

  return new Vector2( x, y );

}

//=============================================================================
static multiply( vec2, value )
{ // multiply a vector by the value passed.
//=============================================================================

  const out = new Vector2( vec2.x, vec2.y );

  if ( Vector2.isArray( value ) ) { // Array
    out.x *= value[0];
    out.y *= value[1];

  } else if ( Vector2.isObject( value ) ) { // Vector
    out.x *= value.x;
    out.y *= value.y;

  } else { // Number
    out.x *= value;
    out.y *= value;

  }

  return out;

}

//=============================================================================
static divide( vec2, value )
{ // multiply a vector by the value passed.
//=============================================================================

  const out = new Vector2( vec2.x, vec2.y );

  if ( Vector2.isArray( value ) ) { // Array
    out.x /= value[0];
    out.y /= value[1];

  } else if ( Vector2.isObject( value ) ) { // Vector
    out.x /= value.x;
    out.y /= value.y;

  } else { // Number
    out.x /= value;
    out.y /= value;

  }

  return out;

}

//=============================================================================
static dot( vec2a, vec2b )
{ // return dot product of two vectors.
//=============================================================================

  return vec2a.x * vec2b.x + vec2a.y * vec2b.y;

}

//=============================================================================
static cross( vec2a, vec2b )
{ // return the cross product of two vectors.
//=============================================================================

  return vec2a.x * vec2b.y - vec2a.y * vec2b.x;

}

//=============================================================================
static angleBetween( vec2a, vec2b )
{ // return the angle btween two vectors.
//=============================================================================

  return vec2a.angle - vec2b.angle;

}

//=============================================================================
static angleTo( vec2a, vec2b )
{ // return the angle between two vectors.
//=============================================================================

  const x = vec2a.x - vec2b.x;
  const y = vec2a.y - vec2b.y;

  return Math.radToDeg( Math.atan2( y, x ) + Math.PI / 2 );

}

//=============================================================================
static normalized( vec2 )
{ // return the vector provided as a normal.
//=============================================================================

  const magnitude = vec2.magnitude;
  const x = vec2.x / magnitude;
  const y = vec2.y / magnitude;

  return new Vector2( x, y );

}

//=============================================================================
static equals( vec2a, vec2b )
{ // return if two vectors are equal to one another.
//=============================================================================

  const x = vec2a.x - vec2b.x;
  const y = vec2a.y - vec2b.y;

  if ( Math.abs( x ) > Number.EPSILON ) return false;
  if ( Math.abs( y ) > Number.EPSILON ) return false;

  return true;

}

//=============================================================================
static distanceBetween( vec2a, vec2b )
{ // return the distance between two vectors.
//=============================================================================

  const x = vec2a.x - vec2b.x;
  const y = vec2a.y - vec2b.y;

  return Math.sqrt( x * x + y * y );

}

//=============================================================================
static reversed( vec2 )
{ // return a vector2 in the opposite direction.
//=============================================================================

  return new Vector2( -vec2.x, -vec2.y );

}

//=============================================================================
static clone( vec2 )
{ // return an exact copy of the vector provided.
//=============================================================================

  return new Vector2( vec2.x, vec2.y );

}

//=============================================================================
static projectOnto( vec2a, vec2b )
{ // project vector onto another.
//=============================================================================

  const dp1 = Vector2.dot( vec2b, vec2b );

  if ( dp1 <= 0 ) return new Vector2( 0, 0 );

  const dp2 = Vector2.dot( vec2a, vec2b );
  const n = dp2 / dp1;

  return new Vector2( vec2b.x * n, vec2b.y * n );

}

}

//=============================================================================
window.Vector2 = Vector2;
window.Vector = Vector2;
//=============================================================================

//=============================================================================
// Segment :
//=============================================================================

//=============================================================================
class Segment
{ // Segment

//=============================================================================
constructor( x, y, vx, vy )
{ // Called on object creation.
//=============================================================================

  this._start = new Vector2( x, y );
  this._end = new Vector2( vx, vy );

}

//=============================================================================
// PROPERTIES :
//=============================================================================

//=============================================================================
get aabb()
{ // return an axis aligned bounding box for this segment.
//=============================================================================

  const x1 = this._start.x;
  const y1 = this._start.y;
  const x2 = this._start.x + this._end.x;
  const y2 = this._start.y + this._end.y;

  const x = Math.min( x1, x2 );
  const y = Math.min( y1, y2 );
  const width = Math.max( x1, x2 );
  const height = Math.max( y1, y2 );

  return new Rect( x, y, width - x, height - y );

}

//=============================================================================
get x()
{ // return the position start x position.
//=============================================================================

  return this._start.x;

}

//=============================================================================
set x( value )
{ // set the position start x position.
//=============================================================================

  this._start.x = value;

}

//=============================================================================
get y()
{ // return the position start y position.
//=============================================================================

  return this._start.y;

}

//=============================================================================
set y( value )
{ // set the position start y position.
//=============================================================================

  this._start.y = value;

}

//=============================================================================
get vx()
{ // return the end vx position.
//=============================================================================

  return this._end.x;

}

//=============================================================================
set vx( value )
{ // set the end vx position.
//=============================================================================

  this._end.x = value;

}

//=============================================================================
get vy()
{ // return the end vy position.
  //=============================================================================

  return this._end.y;

}

//=============================================================================
set vy( value )
{ // set the end vy position.
  //=============================================================================

  this._end.y = value;

}

//=============================================================================
get surfaceNormal()
{ // return the surfaceNormal of the segment.
//=============================================================================

  const magnitude = this._end.magnitude;
  const x = -this.vy / magnitude;
  const y =  this.vx / magnitude;

  return new Vector2( x, y );

}

//=============================================================================
// STATIC :
//=============================================================================


//=============================================================================
static projectOnto( seg1, seg2 )
{ // project a segment onto another.
//=============================================================================

  const a = Vector2.clone( seg1._start );
  const b = Vector2.projectOnto( seg1._end, seg2._end );
  return new Segment( a.x, a.y, b.x, b.y );

}

//=============================================================================
// PROTOTYPE :
//=============================================================================

//=============================================================================
  divide( scalar )
  { // divide the size by scalar provided.
//=============================================================================

    this.x /= scalar;
    this.y /= scalar;
    this.vx /= scalar;
    this.vy /= scalar;

  }

//=============================================================================
  multiply( scalar )
  { // divide the size by scalar provided.
//=============================================================================

    this.x *= scalar;
    this.y *= scalar;
    this.vx *= scalar;
    this.vy *= scalar;

  }

//=============================================================================
  normalSign( vec2 )
  { // return if the point is to the left or right of this line segment.
//=============================================================================

    const vec2a = this._end;
    const vec2b = Vector2.subtract( vec2, this._start );
    return Math.sign( Vector2.cross( vec2a, vec2b ) ) || 1;

  }

//=============================================================================
  getSurfaceNormal( vec2 )
  { // get the surface normal based on the position of vec2.
//=============================================================================

    return Vector2.multiply( this.surfaceNormal, this.normalSign( vec2 ) );

  }

}

//=============================================================================
window.Segment = Segment;
//=============================================================================

//=============================================================================
// Rect :
//=============================================================================

//=============================================================================
class Rect
{ // Rect

//=============================================================================
constructor( x, y, width, height )
{ // Called on object creation.
//=============================================================================

  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  this.angle = 0;

}

//=============================================================================
  get center()
  { // return the center of the rectangle.
//=============================================================================

    return new Vector2( this.x + this.width / 2, this.y + this.height / 2 );

  }

//=============================================================================
get aabb()
{ // return the aabb based on the shape.
//=============================================================================

  return this;

}

//=============================================================================
// PROPERTIES :
//=============================================================================

//=============================================================================
get points()
{ // return the points for this rectangle.
//=============================================================================

  return [
    new Vector2( 0, 0 ),
    new Vector2( this.width, 0 ),
    new Vector2( 0 + this.width, 0 ),
    new Vector2( 0, this.height ),
    new Vector2( 0 + this.width, 0 + this.height ),
    new Vector2( -this.width, 0 ),
    new Vector2( 0, 0 + this.height ),
    new Vector2( 0, -this.height ),
  ]

}

//=============================================================================
get rotatedPoints()
{ // return the rotated points for this shape.
//=============================================================================

  const points = this.points;
  const { x, y, width, height } = this;
  const center = new Vector2( width / 2, height / 2 );
  const angle = this.angle;

  for ( let i = 0, l = points.length; i < l; i += 2 ) {

    const p1 = Vector2.subtract( points[i + 0], center );
    p1.x = p1.x * Math.cos( angle ) - p1.y * Math.sin( angle );
    p1.y = p1.x * Math.sin( angle ) + p1.y * Math.cos( angle );
    points[i] = Vector2.add( p1, center );

    const p2 = Vector2.subtract( points[i + 1], center );
    p2.x = p2.x * Math.cos( angle ) - p2.y * Math.sin( angle );
    p2.y = p2.x * Math.sin( angle ) + p2.y * Math.cos( angle );
    points[i] = Vector2.add( p2, center );

  }

}

//=============================================================================
// PROTOTYPE :
//=============================================================================

//=============================================================================
divide( scalar )
{ // divide the size by scalar provided.
//=============================================================================

  this.width /= scalar;
  this.height /= scalar;

}

//=============================================================================
multiply( scalar )
{ // divide the size by scalar provided.
//=============================================================================

  this.width *= scalar;
  this.height *= scalar;

}

}

//=============================================================================
window.Rect = Rect;
//=============================================================================

//=============================================================================
// Circle :
//=============================================================================

//=============================================================================
class Circle
{ // Circle

//=============================================================================
constructor( x, y, radius )
{ // Called on object creation.
//=============================================================================

  this.x = x;
  this.y = y;
  this.radius = radius;

}

//=============================================================================
// PROPERTIES :
//=============================================================================

//=============================================================================
get aabb()
{ // return the width of the circle.
//=============================================================================

  const x = this.x - this.radius;
  const y = this.y - this.radius;
  const width = this.radius * 2;
  const height = this.radius * 2;

  return new Rect( x, y, width, height );

}

//=============================================================================
get points()
{ // return the points of this collider.
//=============================================================================

  return [
    new Vector2( 0, 0 ),
    new Vector2( this.radius, 0 )
  ];

}

//=============================================================================
// PROTOTYPE :
//=============================================================================

//=============================================================================
divide( scalar )
{ // divide the size by scalar provided.
//=============================================================================

  this.radius /= scalar;

}

//=============================================================================
multiply( scalar )
{ // multiply the size by scalar provided.
//=============================================================================

  this.radius *= scalar;

}

}

//=============================================================================
window.Circle = Circle;
//=============================================================================

//=============================================================================
// Polygon :
//=============================================================================

//=============================================================================
class Polygon
{ // Polygon

//=============================================================================
constructor( segments = [] )
{ // Called on object creation.
//=============================================================================

  this._x = 0;
  this._y = 0;
  this._points = [];

  for ( let i = 0, l = segments.length; i < l; i++ ) {

    const seg = segments[i];

    this._points.push( new Vector2( seg[0], seg[1] ) );
    this._points.push( new Vector2( seg[2], seg[3] ) );

  }

}

//=============================================================================
// PROPERTIES :
//=============================================================================

//=============================================================================
get aabb()
{ // return axis aligned bounding box.
//=============================================================================

  const rects = CollisionManager.segmentsFromShape( this ).map( seg => {
    return seg.aabb;
  } );

  let minX = Infinity;
  let minY = Infinity;
  let maxX = -Infinity;
  let maxY = -Infinity;

  for ( let i = 0, l = rects.length; i < l; i++ ) {

    const x1 = rects[i].x;
    const y1 = rects[i].y;
    const x2 = rects[i].x + rects[i].width;
    const y2 = rects[i].y + rects[i].height;

    if ( x1 < minX ) minX = x1;
    if ( y1 < minY ) minY = y1;
    if ( x2 > maxX ) maxX = x2;
    if ( y2 > maxY ) maxY = y2;

  }

  return new Rect( minX, minY, maxX - minX, maxY - minY );

}

//=============================================================================
get x()
{ // return the position on x axis.
//=============================================================================

  return this._x;

}

//=============================================================================
set x( value )
{ // return the position on x axis.
//=============================================================================

  this._x = value;

}

//=============================================================================
get y()
{ // return the position on y axis.
//=============================================================================

  return this._y;

}

//=============================================================================
set y( value )
{ // return the position on y axis.
//=============================================================================

  this._y = value;

}

//=============================================================================
get points()
{ // return the points for this polygon.
//=============================================================================

  return this._points

}

//=============================================================================
// PROTOTYPE :
//=============================================================================

//=============================================================================
divide( scalar )
{ // divide the size by scalar provided.
//=============================================================================

  this._points = this._points.map( n => Vector.divide( n, scalar ) );

}

//=============================================================================
multiply( scalar )
{ // divide the size by scalar provided.
//=============================================================================

  this._points = this._points.map( n => Vector2.multiply( n, scalar ) );

}

}

//=============================================================================
window.Polygon = Polygon
//=============================================================================

//=============================================================================
// CollisionManager :
//=============================================================================

//=============================================================================
class CollisionManager
{ // CollisionManager

//=============================================================================
constructor()
{ // Called on object creation.
//=============================================================================

  throw new Error( "This is a static class!" );

}

//=============================================================================
// STATIC :
//=============================================================================

//=============================================================================
static isPoint( shape )
{ // return if the shape is a segment.
//=============================================================================

  return shape.constructor.name == 'Vector2';

}

//=============================================================================
static isSegment( shape )
{ // return if the shape is a segment.
//=============================================================================

  return shape.constructor.name == 'Segment';

}

//=============================================================================
static isRect( shape )
{ // return if the shape is a rectangle.
//=============================================================================

  return shape.constructor.name == 'Rect';

}

//=============================================================================
static isCircle( shape )
{ // return if the shape is a circle.
//=============================================================================

  return shape.constructor.name == 'Circle';

}

//=============================================================================
static isPolygon( shape )
{ // return if the shape is a circle.
//=============================================================================

  return shape.constructor.name == 'Polygon' || this.isRect( shape );

}

//=============================================================================
static isValidShape( shape )
{ // Definition.
//=============================================================================

  if ( this.isSegment( shape ) ) return true;
  if ( this.isRect( shape ) ) return true;
  if ( this.isCircle( shape ) ) return true;
  if ( this.isPolygon( shape ) ) return true;

  return false;

}

//=============================================================================
static segmentsFromShape( shape )
{ // return segments from th shape provided.
//=============================================================================

  if ( !this.isValidShape( shape ) ) return [];

  const segments = [];
  const points = shape.points;

  for ( let i = 0, l = points.length; i < l; i += 2 ) {

    const { x:x, y:y } = Vector2.add( points[i], shape );
    const { x:vx, y:vy } = Vector2.clone( points[i + 1] );

    segments.push( new Segment( x, y, vx, vy ) );

  }

  return segments;

}

//=============================================================================
  static aabbCollided( a, b )
  { // return if the axis aligned bounding boxes are collided.
//=============================================================================

    const r1 = a.aabb;
    const r2 = b.aabb;

    const x = r1.x < r2.x + r2.width && r1.x + r1.width > r2.x;
    const y = r1.y < r2.y + r2.height && r1.y + r1.height > r2.y;

    return x && y;

  }

//=============================================================================
  static isInsideShape( c, p )
  { // return if the collider.
//=============================================================================

    let hits1 = [];
    let hits2 = [];

    const segments = this.segmentsFromShape( p );
    const ray1 = new Segment( c.x, c.y, 0, c.radius * 100 );
    const ray2 = new Segment( c.x, c.y, 0, c.radius * 100 );

    for ( let i = 0, l = segments.length; i < l; i++ ) {

      const hit1 = CollisionManager.testCollision( ray1, segments[i] );
      const hit2 = CollisionManager.testCollision( ray2, segments[i] );
      if ( hit1 ) hits1.push( hit1 );
      if ( hit2 ) hits2.push( hit2 );

    }

    return !!( hits1.length % 2 ) && !!( hits2.length % 2 );

  }

//=============================================================================
  static testCollisions( shape, shapes )
  { // test collision against multiple shapes.
//=============================================================================

    let hits = [];

    for ( let i = 0, l = shapes.length; i < l; i++ ) {

      const hit = this.testCollision( shape, shapes[i] );
      if ( hit ) hits.push( hit );

    }

    return hits;

  }

//=============================================================================
static testCollision( shape1, shape2 )
{ // test for collision between two shapes.
//=============================================================================

if ( !this.isValidShape( shape1 ) || !this.isValidShape( shape2 ) ) {
    return null;

  } else if ( !this.aabbCollided( shape1, shape2 ) ) {
    return null;

  } else if ( this.isSegment( shape1 ) && this.isSegment( shape2 ) ) {
    return this.LineXLine( shape1, shape2 );

  } else if ( this.isSegment( shape1 ) && this.isPolygon( shape2 ) ) {
    return this.LineXPolygon( shape1, shape2 );

  } else if ( this.isSegment( shape2 ) && this.isPolygon( shape1 ) ) {
    return this.LineXPolygon( shape2, shape1, true );

  } else if ( this.isSegment( shape1 ) && this.isCircle( shape2 ) ) {
    return this.LineXCircle( shape1, shape2 );

  } else if ( this.isSegment( shape2 ) && this.isCircle( shape1 ) ) {
    return this.LineXCircle( shape2, shape1, true );

  } else if ( this.isCircle( shape1 ) && this.isPolygon( shape2 ) ) {
    return this.CircleXPolygon( shape1, shape2 );

  } else if ( this.isCircle( shape2 ) && this.isPolygon( shape1 ) ) {
    return this.CircleXPolygon( shape2, shape1, true );

  } else if ( this.isPoint( shape1 ) && this.isCircle( shape2 ) ) {
    return this.PointXCircle( shape1, shape2 );

  } else if ( this.isPoint( shape2 ) && this.isCircle( shape1 ) ) {
    return this.PointXCircle( shape2, shape1 );

  } else if ( this.isCircle( shape1 ) && this.isCircle( shape2 ) ) {
    return this.CircleXCircle( shape1, shape2 );

  } else if ( this.isPolygon( shape1 ) && this.isPolygon( shape2 ) ) {
    return this.PolygonxPolygon( shape1, shape2 );

  }

  return null;

}

//=============================================================================
static LineXLine( a, b )
{ // check for collision between two lines.
//=============================================================================

  let hit = null;
  const cross = Vector2.cross( a._end, b._end );

  const i1 = ( ( b.x - a.x ) * a.vy - ( b.y - a.y ) * a.vx ) / cross;
  const i2 = ( ( b.x - a.x ) * b.vy - ( b.y - a.y ) * b.vx ) / cross;

  if ( i2 >= 0 && i2 <= 1 && i1 >= 0 && i1 <= 1 ) {

    const offset = Vector2.multiply( new Vector2( a.vx, a.vy ), i2 );

    let overlap = Vector2.subtract( a._end, offset );
    let normal = b.getSurfaceNormal( a._start );

    hit = { overlap, normal };

  }

  if ( hit ) {
    hit.a = a;
    hit.b = b;
  }

  return hit;

}

//=============================================================================
static LineXPolygon( s, p, reversed )
{ // get collision of a line and a poygon.
//=============================================================================

  let hit = null;
  const lineXLine = this.LineXLine;
  let a = this.segmentsFromShape( p );

  for ( let i = 0, l = a.length; i < l; i++ ) {

    const temp = lineXLine( s, a[i] );

    if ( !hit )
      hit = temp;

    else if ( temp && temp.overlap.magnitude > hit.overlap.magnitude )
      hit = temp;

  }

  if ( hit && reversed ) {
    hit.overlap = Vector2.reversed( hit.overlap );
    hit.a = p;
    hit.b = s;

  } else if ( hit ) {
    hit.a = s;
    hit.b = p;

  }

  return hit;

}

//=============================================================================
//=============================================================================
static reverseRayCast( s, p )
{ // get collision of a line and a poygon.
//=============================================================================

  let hit = null;
  const lineXLine = this.LineXLine;
  let a = this.segmentsFromShape( p );

  for ( let i = 0, l = a.length; i < l; i++ ) {

    const temp = lineXLine( s, a[i] );

    if ( !hit )
      hit = temp;

    else if ( temp && temp.overlap.magnitude < hit.overlap.magnitude )
      hit = temp;

  }

  if ( hit ) {
    hit.a = s;
    hit.b = p;
  }

  return hit;

}
//=============================================================================
static LineXCircle( l, c, reversed )
{ // return collision between a line and a circle.
//=============================================================================

  let hit = null;

  const s = new Segment( l.x, l.y, c.x - l.x, c.y - l.y );
  const p = Segment.projectOnto( s, l );

  const l2 = new Segment( c.x, c.y, p.x + p.vx - c.x, p.y + p.vy - c.y );
  const l2Mag = l2._end.magnitude;
  const dp = Vector2.dot( p._end, l._end );
  const pMag = p._end.magnitude;
  const lMag = l._end.magnitude;

  if ( l2Mag < c.radius ) { // line collision is occuring.

    if ( lMag >= pMag && dp >= 0 ) {  // line collision.

      const overlap = Vector2.up();
      const normal = l.getSurfaceNormal( c );

      overlap.magnitude = c.radius - l2Mag;
      overlap.angle = normal.angle + 180;

      hit = { id: 0, a: c, b: l, overlap, normal };

    } else { // edge collision.

      const vec2 = dp < 0 ? l._start : Vector2.add( l._start, l._end );

      hit = CollisionManager.PointxCircle( vec2, c );

      if ( hit ) {
        hit.a = c;
        hit.b = l;
        hit.id = 0;
      }

    }

  }

  if ( hit && reversed ) hit.overlap = Vector2.reversed( hit.overlap );

  return hit;

}

//=============================================================================
static PointxCircle( p, c )
{ // compar collision between a point( vector ) and a circle.
//=============================================================================

  let hit = null;
  let delta = Vector2.subtract( p, c );
  if ( delta.magnitude < c.radius ) {

    delta.magnitude = c.radius - delta.magnitude;

    hit = {};
    hit.a = c;
    hit.b = p;
    hit.normal = Vector2.normalized( delta );
    hit.overlap = delta;
    hit._edge = true;

  }

  return hit;

}

//=============================================================================
static PointxRect( p, r )
{ // compar collision between a point( vector ) and a circle.
//=============================================================================

  const { x, y, width, height } = r;

  return p.x > x && p.x < x + width && p.y > y && p.y < y + height;

}

//=============================================================================
static CircleXPolygon( c, p, reversed )
{ // return collision between a circle and a polygon.
//=============================================================================

  let hits = [];
  const segments = this.segmentsFromShape( p );

  for ( let i = 0, l = segments.length; i < l; i++ ) {

    if ( !this.aabbCollided( segments[i], c ) ) continue;

    let temp = this.LineXCircle( segments[i], c, reversed );
    if ( temp ) { temp.b = p; temp.id = i; hits.push( temp ); };

  }

  let hit = this.getLongestHit( hits );

  if ( this.isInsideShape( c, p ) ) {

    if ( !hit ) {
      hit = this.getInnerCollision( c, segments );
      hit.b = p;

    } else {
      hit.overlap = Vector2.reversed( hit.overlap );
      hit.overlap.magnitude = c.radius * 2 - hit.overlap.magnitude;
      hit.normal = Vector2.reversed( hit.normal );

    }

  }

  return hit;

}

//=============================================================================
static getInnerCollision( c, segments )
{ // resolve an inner collision without contact.
//=============================================================================

  const hits = [];

  for (let i = 0, l = segments.length; i < l; i++) {

    let end = Vector2.reversed( segments[i].getSurfaceNormal( c ) );
    end = Vector2.multiply( end, 250 );
    const ray = new Segment( c.x, c.y, end.x, end.y );
    const hit = CollisionManager.testCollision( ray, segments[i] );

    if ( hit ) { hit.id = i; hits.push( hit ); };

  }

  const hit = CollisionManager.getLongestHit( hits );

  if ( hit ) {

    hit.normal = Vector2.reversed( hit.normal );
    hit.overlap = Vector2.subtract( hit.a._end, hit.overlap );
    hit.overlap = Vector2.reversed( hit.overlap );
    hit.overlap.magnitude += c.radius;

  }

  return hit;

}

//=============================================================================
static CircleXCircle( c1, c2 )
{ // compare collision between two circles.
//=============================================================================

  let hit = null;

  const deltaM = Vector2.distanceBetween( c1, c2 );
  const total = c1.radius + c2.radius;
  if ( total - deltaM > Number.EPSILON ) {

    hit = {};
    hit.a = c1;
    hit.b = c2;
    hit.overlap = new Vector2( 0, total - deltaM );
    hit.overlap.angle = Vector2.angleBetween( c1, c2 );
    hit.normal = new Segment( c1.x, c1.y, hit.overlap.x, hit.overlap.y ).getSurfaceNormal( c2 );

  }

  return hit;

}

//=============================================================================
static PolygonxPolygon( p1, p2 )
{ // return collision betweeen two polygons.
//=============================================================================

  // TODO: this needs a proper implementation.

  // let hits = [];

  // const segmentsA = this.segmentsFromShape( p1 );
  // // const segmentsB = this.segmentsFromShape( p2 );

  // for ( let i = 0, l = segmentsA.length; i < l; i++ ) {
  //   const temp = this.LineXPolygon( segmentsA[i], p2 );
  //   if ( temp && p1 != p2 ) {
  //     hits.push( temp ); temp.a = p1; temp.b = p2;
  //   }

  // }

  // return this.getLongestHit( hits );

}

//=============================================================================
static getShortestHit( hits )
{ // return the best possible collision source from a list of collisions.
//=============================================================================

  const walls = hits.filter( hit => !hit._edge );
  const edges = hits.filter( hit => !!hit._edge );

  if ( walls.length > 0 ) {
    return walls.sort( ( a, b ) => {
      return a.overlap.magnitude - b.overlap.magnitude;
    } )[0];
  }

  if ( edges.length > 0 ) {
    return edges.sort( ( a, b ) => {
      return a.overlap.magnitude - b.overlap.magnitude;
    } )[0];
  }

  return null;

}

//=============================================================================
  static getLongestHit( hits )
  { // return the best possible collision source from a list of collisions.
//=============================================================================

    const n = 0.000001;

    hits = hits.filter( hit => hit.overlap.magnitude > n );

    return hits.sort( ( a, b ) => {
      const diff = b.overlap.magnitude - a.overlap.magnitude

      if ( diff == 0 ) {
        return Number( b._edge || false ) - Number( a._edge || false );

      } else {
        return diff;

      }

    } )[0] || null;

  }

}

//=============================================================================
window.CollisionManager = CollisionManager;
//=============================================================================

//=============================================================================
// Debug_Layer :
//=============================================================================

//=============================================================================
class Debug_Layer extends PIXI.Container
{ // Debug_Layer

//=============================================================================
constructor()
{ // Called on object creation.
//=============================================================================

  super();
  this._graphic = new PIXI.Graphics();
  this._graphic.lineStyle( 1, 0xffffff, 1 );
  this.addChild( this._graphic );

}

//=============================================================================
drawLineCollider( line, color = 0xffffff )
{ // draw the line line.
//=============================================================================

  const screen = $gameScreen;
  const scale = screen.zoomScale();

  const px = $gamePlayer.x;
  const dx = $gameMap._displayX;
  const mx = $gameMap.width();

  const py = $gamePlayer.y;
  const dy = $gameMap._displayY;
  const my = $gameMap.height();

  let x = line.x - ( px < dx ? dx - mx : dx ) * $gameMap.tileWidth();
  let y = line.y - ( py < dy ? dy - my : dy ) * $gameMap.tileHeight();
  let sx = x + line.vx;
  let sy = y + line.vy;

  let scaleX = screen.zoomX() * ( scale - 1 ) / scale;
  let scaleY = screen.zoomY() * ( scale - 1 ) / scale;

  this._graphic.lineStyle( 1, color, 1 );
  this._graphic.moveTo(  x - scaleX, y - scaleY );
  this._graphic.lineTo( sx - scaleX, sy - scaleY );

}

//=============================================================================
drawCircleCollider( circle, color = 0xff00ff )
{ // draw a circle collider.
//=============================================================================

  const screen = $gameScreen;
  const scale = screen.zoomScale();

  const px = $gamePlayer.x;
  const dx = $gameMap._displayX;
  const mx = $gameMap.width();

  const py = $gamePlayer.y;
  const dy = $gameMap._displayY;
  const my = $gameMap.height();

  let scaleX = screen.zoomX() * ( scale - 1 ) / scale;
  let scaleY = screen.zoomY() * ( scale - 1 ) / scale;

  const { x, y, radius } = circle;
  const ox = ( px < dx ? dx - mx : dx ) * $gameMap.tileWidth();
  const oy = ( py < dy ? dy - my : dy ) * $gameMap.tileHeight();

  this._graphic.lineStyle( 1, color, 1 );
  this._graphic.beginFill( color, 0 );
  this._graphic.drawCircle( x - ox - scaleX, y - oy - scaleY, radius - 1 );
  this._graphic.endFill();

}

//=============================================================================
drawPolygonCollider( polygon, color = 0xff0000 )
{ // draw a polygon collider.
//=============================================================================

  const segments = CollisionManager.segmentsFromShape( polygon );

  for ( let i = 0, l = segments.length; i < l; i++ ) {
    if ( segments[i] ) this.drawLineCollider( segments[i], color );
  }

}

//=============================================================================
drawShape( shape, color )
{ // draw the shape provided.
//=============================================================================

  if ( CollisionManager.isSegment( shape ) ) {
    this.drawLineCollider( shape, color );

  } else if ( CollisionManager.isCircle( shape ) ) {
    this.drawCircleCollider( shape, color );

  } else if ( CollisionManager.isPolygon( shape ) ) {
    this.drawPolygonCollider( shape, color );

  }

}

// always ensure this is the last object on the screen.
//------------------------------------------------------------------------
update() {
//------------------------------------------------------------------------
  if ( this.parent ) {

    const screen = $gameScreen;

    if ( screen ) {
      const scale = screen.zoomScale();

      this.scale.set( scale, scale );

    }

    let last = this.parent.children.length - 1;
    if ( this.parent.children.indexOf( this ) < last )
      this.parent.addChild( this );
  }
};
}

//=============================================================================
window.Debug_Layer = Debug_Layer;
//=============================================================================
( function ( $ ) { // CONFIG:


//=============================================================================
// Create functions specific for my code if it does not already exist!
// WARNING: DO NOT EDIT BELOW THIS LINE!!!
//=============================================================================

//-----------------------------------------------------------------------------
Chaucer.parseArgs = Chaucer.parseArgs || function ( args )
{ // compare the current version with the target version.
//-----------------------------------------------------------------------------

  const obj = {};
  for ( var i = 0, l = args.length; i < l; i += 2 ) {
    obj[args[i]] = args[i + 1];
  }

  return obj;

};

//-----------------------------------------------------------------------------
  Chaucer.compareVersion = Chaucer.compareVersion || function ( current, target )
  { // compare the current version with the target version.
//-----------------------------------------------------------------------------

    const v1 = current.split( '.' );
    const v2 = target.split( '.' );
    for ( let i = 0, l = v1.length; i < l; i++ ) {
      if ( v1[i] < v2[i] ) return -1; // version is lower!
      if ( v1[i] > v2[i] ) return 1; // version is higher!
    }

    return 0; // same version!

  };

//-----------------------------------------------------------------------------
  Chaucer.parse = Chaucer.parse || function( data )
  { // recursively parse any data passed in.
//-----------------------------------------------------------------------------
    try {
      data = JSON.parse( data );

    } catch ( err ) {
      data = data;

    } finally {

      if ( typeof data === 'object' ) {

        for ( const key in data ) {
          data[key] = Chaucer.parse( data[key] );
        };

      };

    };

    return data;

  };

//-----------------------------------------------------------------------------
  Chaucer.makePluginInfo = Chaucer.makePluginInfo || function ( $, n )
  { // Create plugin info for the object provided.
//-----------------------------------------------------------------------------

    for ( var i = 0, l = $plugins.length; i < l; i++ ) {

      if ( !$plugins[i].description.match( n ) ) continue;

      $.author = 'Chaucer';
      $.name = RegExp.$1;
      $.version = RegExp.$2;
      $.pluginName = $plugins[i].name;
      $.params = Chaucer.parse( $plugins[i].parameters );
      $.commands = {};
      $.alias = {};

    };

  };

//============================================================================
  //Create plugin information.
//============================================================================

  const identifier =  /(Collision Altering Plugin) : Version - (\d+\.\d+\.\d+)/;
  // $._nameError = 'Collision Altering Plugin was unable to load! Please revert any changes back to normal!';


  Chaucer.makePluginInfo( $, identifier );

  if ( !$.name ) throw new Error( $.nameError );

//=============================================================================

//-----------------------------------------------------------------------------
$.registerPluginCommand = function ( command, fn )
{ // compare the current version with the target version.
//-----------------------------------------------------------------------------

if ( Utils.RPGMAKER_NAME === 'MV' )
  $.commands[command] = fn;

else if ( Utils.RPGMAKER_NAME === 'MZ' )
  PluginManager.registerCommand( $.pluginName, command, fn );

};

//-----------------------------------------------------------------------------
$.alias = function ( className, method, fn, isStatic )
{ // use this method to quickly alias a method of a particular class.
//-----------------------------------------------------------------------------

  let key = `${className.name}.${( isStatic ? '' : 'prototype.' ) + method}`;
  let object = ( isStatic ? className : className.prototype );

  if ( $.alias[key] ) throw new Error( `${key} already aliased!` );

  $.alias[key] = object[method];

  let fnString = fn.toString();
  let instances = fnString.match( /\$\.alias\((.*?)\)/g );

  for ( let i = 0, len = instances.length; i < len; i++ ) {

    let old = instances[i];
    let args = ['this'].concat( old.match( /\((.*?)\)/ )[1].split( ',' ) );
    let next = `$.alias["${key}"].call(` + args.join( ',' ) + ')';

    fnString = fnString.replace( old, next );

  }

  eval( `${key} = ` + fnString );

};

//-----------------------------------------------------------------------------
$.expand = function ( className, method, fn, isStatic )
{ // use this method to quickly alias a method of a particular class.
//-----------------------------------------------------------------------------

  const obj = isStatic ? className : className.prototype;
  obj[method] = fn;

};

//-----------------------------------------------------------------------------
$.expandCollisionInfo = function()
{ // expand collision info based on tile size
//-----------------------------------------------------------------------------

  const w = $dataSystem.tileSize || 48;
  const h = $dataSystem.tileSize || 48;

  for ( let key in $collisionInfo ) {
    const tileset = $collisionInfo[key];

    for ( let key2 in tileset ) {
      const data = tileset[key2];
      if ( !data || !data.collider ) continue;

      if ( CollisionManager.isSegment( data.collider ) ) {
        if ( !data.collider._start ) { // compatibility w/ old colliders.
          data.collider._start = new Vector2( data.collider._x, data.collider._y );
          data.collider._end = data.collider._vector;
        }

        const { x, y, vx, vy } = data.collider;
        data.collider = new Segment( x * w, y * y, vx * w, vy * h );

      } else if ( CollisionManager.isPolygon( data.collider ) ) {
        data.collider._points.forEach( point => {
          point.x *= w;
          point.y *= h;
        } );

      }

    }

  }

};
//=============================================================================
// MV SPECIFIC CODE :
//=============================================================================

  if ( Utils.RPGMAKER_NAME === 'MV' ) {

//-----------------------------------------------------------------------------
    $.alias( Game_Interpreter, 'pluginCommand', function( command, args ) {
//-----------------------------------------------------------------------------

      $.alias( command, args );

      command = command.toLowerCase();
      if ( $.commands[command] ) {
        $.commands[command].call( this, Chaucer.parseArgs( args ) );
      }
    } );

  }


//=============================================================================
// ALIASED CODE BELOW THIS LINE!
//=============================================================================

//=============================================================================
// Scene_Boot :
//=============================================================================

if ( Utils.RPGMAKER_NAME === 'MV' ) {

  //-----------------------------------------------------------------------------
    $.alias( Scene_Boot, 'isReady', function()
    { // Aliased isReady of class Scene_Boot.
  //-----------------------------------------------------------------------------

      const value = $.alias();

      if ( value ) Chaucer.CAP.expandCollisionInfo();

      return value;

    }, false );

}

//-----------------------------------------------------------------------------
$.alias( Scene_Boot, 'onDatabaseLoaded', function( object )
{ // Aliased onLoad of class DataManager.
//-----------------------------------------------------------------------------

  $.alias( object );
  Chaucer.CAP.expandCollisionInfo();

}, false );


//=============================================================================
// DataManager :
//=============================================================================

window.$collisionInfo = null;

DataManager._databaseFiles.push( {
  name: "$collisionInfo", src: "CollisionInfo.json"
} );

//-----------------------------------------------------------------------------
$.alias( DataManager, 'loadDataFile', function( name, src )
{ // Aliased loadDataFile of class DataManager.
//-----------------------------------------------------------------------------

  if ( name === "$collisionInfo" ) {

    var xhr = new XMLHttpRequest();
    var url = 'data/' + src;

    xhr.open('GET', url);
    xhr.overrideMimeType('application/json');
    xhr.onload = function() {
      if ( xhr.status < 400 ) {
        window[name] = JsonEx.parse( xhr.responseText );
        DataManager.onLoad(window[name]);
      }
    };
    xhr.onerror = function() {
      $collisionInfo = {};
    };
    window[name] = null;
    xhr.send();

  } else {
    $.alias( name, src );

  }


}, true );

//=============================================================================
// Game_Map :
//=============================================================================

//-----------------------------------------------------------------------------
  $.alias( Game_Map, 'isLadder', function( x, y )
  { // Aliased isLadder of class Game_Map.
//-----------------------------------------------------------------------------

    if ( this.isPixelMovement() ) {
      x = Math.round( x );
      y = Math.round( y );
    }

    return $.alias( x, y );

  }, false );

//-----------------------------------------------------------------------------
  $.alias( Game_Map, 'isBush', function( x, y )
  { // Aliased isBush of class Game_Map.
//-----------------------------------------------------------------------------

    if ( this.isPixelMovement() ) {
      x = Math.round( x );
      y = Math.round( y );
    }

    return $.alias( x, y );

  }, false );

//-----------------------------------------------------------------------------
  $.alias( Game_Map, 'isCounter', function( x, y )
  { // Aliased isCounter of class Game_Map.
//-----------------------------------------------------------------------------

    if ( this.isPixelMovement() ) {
      x = Math.round( x );
      y = Math.round( y );
    }

    return $.alias( x, y );

  }, false );

//-----------------------------------------------------------------------------
  $.alias( Game_Map, 'isDamageFloor', function( x, y )
  { // Aliased isDamageFloor of class Game_Map.
//-----------------------------------------------------------------------------

    if ( this.isPixelMovement() ) {
      x = Math.round( x );
      y = Math.round( y );
    }

    return $.alias( x, y );


  }, false );

//-----------------------------------------------------------------------------
  $.alias( Game_Map, 'terrainTag', function( x, y )
  { // Aliased terrainTag of class Game_Map.
//-----------------------------------------------------------------------------

    if ( this.isPixelMovement() ) {
      x = Math.round( x );
      y = Math.round( y );
    }

    return $.alias( x, y );

  }, false );

//-----------------------------------------------------------------------------
  $.alias( Game_Map, 'regionId', function( x, y )
  { // Aliased regionId of class Game_Map.
//-----------------------------------------------------------------------------

    if ( this.isPixelMovement() ) {
      x = Math.round( x );
      y = Math.round( y );
    }

    return $.alias( x, y );

  }, false );

//-----------------------------------------------------------------------------
$.alias( Game_Map, 'update', function( sceneActive )
{ // Aliased update of class Game_Map.
//-----------------------------------------------------------------------------

  $gameTemp.clearDebugLayer();
  $.alias( sceneActive );

}, false );

//-----------------------------------------------------------------------------
$.expand( Game_Map, 'isPixelMovement', function()
{ // return if the current map is using pixel movement.
//-----------------------------------------------------------------------------

  if ( !$dataMap || !$dataMap.meta ) return false;
  return $dataMap.meta.pixel;

}, false );

//-----------------------------------------------------------------------------
$.expand( Game_Map, 'getFullRectTile', function( x, y )
{ // Definition.
//-----------------------------------------------------------------------------

  const tw = $gameMap.tileWidth();
  const th = $gameMap.tileHeight();

  return new Rect( x * tw, y * th, tw, th );

}, false );

//-----------------------------------------------------------------------------
$.expand( Game_Map, 'tileCollider', function( id, x, y )
{ // return the collider for the tile id at x and y.
//-----------------------------------------------------------------------------

  const tilesetId = $gameMap.tilesetId();

  const mw = $gameMap.width();
  const mh = $gameMap.height();
  const tw = $gameMap.tileWidth();
  const th = $gameMap.tileHeight();
  const parallax = $gameMap.parallaxName();
  const bitmap = SceneManager._scene._spriteset._parallax.bitmap;
  const pWidth = Math.ceil( bitmap.width / th );
  const pId = x.mod( mw ) + ( y.mod( mh ) * pWidth ) ;

  if ( Tilemap.isWaterTile( id ) ) return this.getFullRectTile( x, y );


  if ( $collisionInfo[parallax] && $collisionInfo[parallax][pId] ) {

    let data = $collisionInfo[parallax][pId].collider;

    if ( data ) {

      let collider = null;

      if ( Utils.RPGMAKER_NAME == 'MV' ) {
        collider = Object.assign( new window[data.constructor.name](), data );

      } else {
        if ( !data['@'] && data.constructor ) data['@'] = data.constructor.name;
        collider = Object.assign( new window[data['@']](), data );

      }

      collider.x = data.x + x * tw +  ( collider._ox || 0 );
      collider.y = data.y + y * th +  ( collider._oy || 0 );
      collider._tileId = id;

      return collider;

    }

  }

  if ( $collisionInfo[tilesetId] && $collisionInfo[tilesetId][id] ) {

    let data = $collisionInfo[tilesetId][id].collider;

    if ( data ) {

      let collider = null;

      if ( Utils.RPGMAKER_NAME == 'MV' ) {
        collider = Object.assign( new window[data.constructor.name](), data );

      } else {
        if ( !data['@'] && data.constructor ) data['@'] = data.constructor.name;
        collider = Object.assign( new window[data['@']](), data );

      }

      collider.x = data.x + x * tw +  ( collider._ox || 0 );
      collider.y = data.y + y * th +  ( collider._oy || 0 );
      collider._tileId = id;

      return collider;

    }

  }

  return null;


}, false );

//-----------------------------------------------------------------------------
$.expand( Game_Map, 'boatCollider', function( id, x, y )
{ // return the collider for the tile id at x and y.
//-----------------------------------------------------------------------------

  const tilesetId = $gameMap.tilesetId();

  const tw = $gameMap.tileWidth();
  const th = $gameMap.tileHeight();

  if ( !$gameMap.isBoatPassable( x, y ) ) return this.getFullRectTile( x, y );

  if ( $collisionInfo[tilesetId] && $collisionInfo[tilesetId][id] ) {
    let data = $collisionInfo[tilesetId][id].collider;

    if ( data ) {

      let collider = Object.assign( new window[data['@']](), data );

      collider.x = data.x + x * tw +  ( collider._ox || 0 );
      collider.y = data.y + y * th +  ( collider._oy || 0 );

      return collider;

    }

  }

  return null;


}, false );

//-----------------------------------------------------------------------------
  $.expand( Game_Map, 'shipCollider', function( id, x, y )
  { // return the collider for the tile id at x and y.
//-----------------------------------------------------------------------------

    const tilesetId = $gameMap.tilesetId();

    const tw = $gameMap.tileWidth();
    const th = $gameMap.tileHeight();

    if ( !$gameMap.isShipPassable( x, y ) ) return this.getFullRectTile( x, y );

    if ( $collisionInfo[tilesetId] && $collisionInfo[tilesetId][id] ) {
      let data = $collisionInfo[tilesetId][id].collider;

      if ( data ) {

        let collider = Object.assign( new window[data['@']](), data );

        collider.x = data.x + x * tw +  ( collider._ox || 0 );
        collider.y = data.y + y * th +  ( collider._oy || 0 );

        return collider;

      }

    }

    return null;


  }, false );

//-----------------------------------------------------------------------------
  $.alias( Game_Map, 'canvasToMapX', function( x )
  { // Aliased canvasToMapX of class Game_Map.
//-----------------------------------------------------------------------------

    if ( this.isPixelMovement() ) {
      return this.canvasToPixelMapX( x );

    } else {
      return $.alias( x );

    }

  }, false );

//-----------------------------------------------------------------------------
  $.expand( Game_Map, 'canvasToPixelMapX', function( x )
  { // return pixel coordinate rather than a rounded tile coordinate.
//-----------------------------------------------------------------------------

    const tileWidth = this.tileWidth();
    const originX = this._displayX * tileWidth;
    const mapX = ( ( originX + x ) / tileWidth );
    return this.roundX( mapX ) - 0.5;

  }, false );


//-----------------------------------------------------------------------------
  $.alias( Game_Map, 'canvasToMapY', function( y )
  { // Aliased canvasToMapY of class Game_Map.
//-----------------------------------------------------------------------------

  if ( this.isPixelMovement() ) {
    return this.canvasToPixelMapY( y );

  } else {
    return $.alias( y );

  }

  }, false );

//-----------------------------------------------------------------------------
  $.expand( Game_Map, 'canvasToPixelMapY', function( y )
  { // return pixel coordinate rather than a rounded tile coordinate.
//-----------------------------------------------------------------------------

    const tileHeight = this.tileHeight();
    const originY = this._displayY * tileHeight;
    const mapY = ( ( originY + y ) / tileHeight );
    return this.roundY( mapY ) - 0.5;

  }, false );

//=============================================================================
// Game_CharacterBase :
//=============================================================================

//-----------------------------------------------------------------------------
Object.defineProperties( Game_CharacterBase.prototype, {
//-----------------------------------------------------------------------------
  position: {

    // Get Position :
    get: function() {
      return new Vector2( this._realX, this._realY );
    },

    // Set Position :
    set: function( value ) {
      this._x = this._realX = value.x; this._y = this._realY = value.y;
    }

  }

} );

//-----------------------------------------------------------------------------
$.alias( Game_CharacterBase, 'initMembers', function()
{ // Aliased initMembers of class Game_CharacterBase.
//-----------------------------------------------------------------------------

  const tw = $gameMap ? $gameMap.tileWidth() : 48;
  const th = $gameMap ? $gameMap.tileHeight() : 48;

  $.alias();

  this._8dirSprite = false;
  this._requestThrough = null;
  this.colliderOffset = new Vector2( 0, 0 );
  this.acceleration = new Vector2( 0, 0 );
  this.velocity = new Vector2( 0, 0 );
  this._travelDistance = 1;
  this.colliders = {
    hitbox: new Rect( 0, 0, tw, th, 3, 3 ),
    circle: new Circle( 0, 0, tw / 2 )
  }
  this._destination = null;

}, false );

//-----------------------------------------------------------------------------
$.alias( Game_CharacterBase, 'setPosition', function( x, y )
{ // Aliased setPosition of class Game_CharacterBase.
//-----------------------------------------------------------------------------

  if ( $gameMap && $gameMap.isPixelMovement() ) {
    this.setPixelPosition( x, y );

  } else {
    $.alias( x, y );

  }

}, false );

//-----------------------------------------------------------------------------
$.expand( Game_CharacterBase, 'setPixelPosition', function( x, y )
{ // set the pixel position of the character.
//-----------------------------------------------------------------------------

  this._x = x;
  this._y = y;
  this._realX = x;
  this._realY = y;

}, false );

//-----------------------------------------------------------------------------
$.expand( Game_CharacterBase, 'repositionColliders', function( position )
{ // position the colliders to the players current location.
//-----------------------------------------------------------------------------

  const { circle, hitbox } = this.colliders;
  const px = ( position.x + 0.5 ) * $gameMap.tileWidth();
  const py = ( position.y + 0.5  ) * $gameMap.tileHeight();

  // circle collider.
  circle.x = px + ( circle._ox || 0 );
  circle.y = py + ( circle._oy || 0 );

  // hitbox.
  hitbox.x = px - hitbox.width / 2 + ( hitbox._ox || 0 );
  hitbox.y = py - hitbox.height / 2 + ( hitbox._oy || 0 );

  hitbox._eventId = this._eventId;
  circle._eventId = circle._eventId;

}, false );

//-----------------------------------------------------------------------------
$.expand( Game_CharacterBase, 'getCollider', function( useHitbox )
{ // return the current collider.
//-----------------------------------------------------------------------------


  this.repositionColliders( this.position );

  if ( useHitbox ) {
    const { x, y, width, height } = this.colliders.hitbox;
    const hitbox = new Rect( x, y, width, height );
    hitbox._eventId = this.colliders.hitbox._eventId

    return hitbox;

  } else {
    const { x, y, radius } = this.colliders.circle;
    const circle = new Circle( x, y, radius );
    circle._eventId = this.colliders.circle._eventId

    return circle;

  }

}, false );

//-----------------------------------------------------------------------------
$.expand( Game_CharacterBase, 'getColliderAt', function( position, useHitbox )
{ // return the current collider.
//-----------------------------------------------------------------------------


  this.repositionColliders( position );

  if ( useHitbox ) {
    const { x, y, width, height } = this.colliders.hitbox;
    const hitbox = new Rect( x, y, width, height );
    hitbox._eventId = this.colliders.hitbox._eventId

    return hitbox;

  } else {
    const { x, y, radius } = this.colliders.circle;
    const circle = new Circle( x, y, radius );
    circle._eventId = this.colliders.circle._eventId;

    return circle;

  }

}, false );

//-----------------------------------------------------------------------------
$.expand( Game_CharacterBase, 'mapCollidersAtPos', function( x, y, debug )
{ // return tile data for the tile at x and y.
//-----------------------------------------------------------------------------

  const { TILE_ID_A1 } = Tilemap;
  const { regionId, layeredTiles } = $gameMap;

  let tx = x;
  let ty = y;

  if ( x < 0 ) tx += $gameMap.width();
  if ( y < 0 ) ty += $gameMap.height();
  if ( x >= $gameMap.width() ) tx -= $gameMap.width();
  if ( y >= $gameMap.height() ) ty -= $gameMap.height();

  const tile = {
    x: x, y: y, ids: $gameMap.layeredTiles( tx, ty )
  };

  return tile.ids.map( id => {
    if ( id >= TILE_ID_A1 ) {
      id = TILE_ID_A1 + Math.floor( ( id - TILE_ID_A1 ) / 48 ) * 48;
    }

    return $gameMap.tileCollider( id, x, y );

  } ).filter( collider => !!collider );

}, false );

//-----------------------------------------------------------------------------
$.expand( Game_CharacterBase, 'getMapColliders', function()
{ // get map colliders.
//-----------------------------------------------------------------------------

  let colliders = [];

  const aabb = this.getColliderAt( this.position ).aabb;
  const tw = $gameMap.tileWidth();
  const th = $gameMap.tileHeight();

  const x = Math.floor( aabb.x / tw ) - 1;
  const y = Math.floor( aabb.y / th ) - 1;
  const w = Math.ceil( ( aabb.x + aabb.width ) / tw );
  const h = Math.ceil( ( aabb.y + aabb.height ) / th );

  for ( var i = x; i <= w; i++ ) {
    for ( var j = y; j <= h; j++ ) {
      colliders = colliders.concat( this.mapCollidersAtPos( i, j ) );
    }
  }

  return colliders;

}, false );

//-----------------------------------------------------------------------------
$.expand( Game_CharacterBase, 'getMapCollidersInRect', function( rect )
{ // get map colliders between two points.
//-----------------------------------------------------------------------------

  let colliders = [];

  const tw = $gameMap.tileWidth();
  const th = $gameMap.tileHeight();

  const x = Math.floor( rect.x / tw ) - 1;
  const y = Math.floor( rect.y / th ) - 1;
  const w = Math.ceil( ( rect.x + rect.width ) / tw );
  const h = Math.ceil( ( rect.y + rect.height ) / th );

  for ( var i = x; i <= w; i++ ) {
    for ( var j = y; j <= h; j++ ) {
      colliders = colliders.concat( this.mapCollidersAtPos( i, j ) );
    }
  }

  return colliders;

}, false );

//-----------------------------------------------------------------------------
  $.expand( Game_CharacterBase, 'distanceTo', function( character )
  { // return the distance from this character to the character specified.
//-----------------------------------------------------------------------------

    const x = Math.abs( this.x - character.x );
    const y = Math.abs( this.y - character.y );

    return x + y;

  }, false );

//-----------------------------------------------------------------------------
$.expand( Game_CharacterBase, 'allCharacters', function()
{ // return all characters in a single array.
//-----------------------------------------------------------------------------

  const player = [$gamePlayer];
  const events = $gameMap.events();
  const followers = $gamePlayer._followers._data.filter( f => !!f.actor() );
  const vehicles = $gameMap.vehicles().filter( v => v._mapId == $gameMap.mapId() );

  return events.concat( vehicles ).concat( player ).concat( followers );

}, false );

//-----------------------------------------------------------------------------
$.expand( Game_CharacterBase, 'getCharacterColliders', function()
{ // return character colliders.
//-----------------------------------------------------------------------------

  if ( !this.isNormalPriority() ) return [];

  const characters = this.allCharacters().filter( char => {
      if ( !char || char === this ) return false;
      if ( char.isThrough() ) return false;
      if ( Imported.OcRam_Passages ) {
        if ( char._higherLevel != this._higherLevel ) return false;
      }
      return true;
   } );

  return characters.map( char => { return char.getCollider( true ); } );

}, false );

//-----------------------------------------------------------------------------
$.expand( Game_CharacterBase, 'getValidColliders', function()
{ // get all valid colliders.
//-----------------------------------------------------------------------------

  let colliders = this.getMapColliders().concat( this.getCharacterColliders() );

  if ( Imported.OcRam_Passages ) {
    colliders = colliders.concat( this.ocRamPassageColliders() );
  }

  return colliders;

}, false );

//-----------------------------------------------------------------------------
$.expand( Game_CharacterBase, 'setTravelDistance', function( value )
{ // set the travel distance when using the "move straight" command.
//-----------------------------------------------------------------------------

  this._travelDistance = value;

}, false );

//-----------------------------------------------------------------------------
  $.expand( Game_CharacterBase, 'setDestination', function( x, y )
  { // set a new destination for the character.
//-----------------------------------------------------------------------------

    let vec2 = new Vector2( x, y );

    if ( x.constructor.name == 'Vector2' ) vec2 = x;

    const start = this.position;
    const end = vec2;
    const acceleration = Vector2.normalized( Vector2.subtract( end, start ) );

    this._destination = { start, end, acceleration };
    this.setDirectionFromVector( acceleration );

  }, false );

//-----------------------------------------------------------------------------
  $.expand( Game_CharacterBase, 'setDirectionFromVector', function( vec2 )
  { // set the destination based on the vector provided.
//-----------------------------------------------------------------------------

    if ( this.is8DirSprite() ) {

      const d = this.getDirectionFromVector( vec2 );
      if ( d > 0 ) return this.setDirection( d );

    }

    if ( Math.abs( vec2.x ) > Math.abs( vec2.y ) ) {
      this.setDirection( vec2.x < 0 ? 4 : 6 );

    } else if ( Math.abs( vec2.x ) < Math.abs( vec2.y ) ) {
      this.setDirection( vec2.y < 0 ? 8 : 2 );

    } else {

      const horz = vec2.x < 0 ? 4 : 6;
      const vert = vec2.y < 0 ? 8 : 2;

      this.setDiagonalDirection( horz, vert );

    }

  }, false );

//-----------------------------------------------------------------------------
$.expand( Game_CharacterBase, 'clearDestination', function()
{ // clear the current destination.
//-----------------------------------------------------------------------------

  this._destination = null;

}, false );

//-----------------------------------------------------------------------------
$.expand( Game_CharacterBase, 'hasDestination', function()
{ // return if the character has a destination.
//-----------------------------------------------------------------------------

  return !!this._destination;

}, false );

//-----------------------------------------------------------------------------
  $.expand( Game_CharacterBase, 'destinationReached', function()
  { // return if the destination has been reached.
//-----------------------------------------------------------------------------

    if ( !this._destination ) return false;
    return Vector2.equals( this._destination.end, this.position );

  }, false );

//-----------------------------------------------------------------------------
$.alias( Game_CharacterBase, 'isMoving', function()
{ // Aliased isMoving of class Game_CharacterBase.
//-----------------------------------------------------------------------------

  if ( $gameMap.isPixelMovement() ) {
    return this.isPixelMoving();

  } else {
    return $.alias();

  }
}, false );

//-----------------------------------------------------------------------------
$.expand( Game_CharacterBase, 'isPixelMoving', function()
{ // return if character is moving in pixel movement.
//-----------------------------------------------------------------------------

  if ( this.acceleration.x != 0 || this.acceleration.y != 0 ) {
    return true;
  }
  return !!this.hasDestination();

}, false );

//-----------------------------------------------------------------------------
$.expand( Game_CharacterBase, 'getTraction', function()
{ // return the traction of the character.
//-----------------------------------------------------------------------------

  const x = Math.round( this.x );
  const y = Math.round( this.y );
  const list = $.params.tractionRegions;
  const regionId = $gameMap.regionId( x, y );
  const data = list.find( data => data.regionId == regionId );

  return data ? data.traction : 1;

}, false );

//-----------------------------------------------------------------------------
$.expand( Game_CharacterBase, 'accelerationSpeed', function()
{ // return the amount of speed when accelerating.
//-----------------------------------------------------------------------------

  return this.distancePerFrame() * this.getTraction();

}, false );

//-----------------------------------------------------------------------------
$.expand( Game_CharacterBase, 'decelerationSpeed', function()
{ // return the amount of speed when accelerating.
//-----------------------------------------------------------------------------

  return this.distancePerFrame() * this.getTraction();

}, false );

//-----------------------------------------------------------------------------
$.alias( Game_CharacterBase, 'moveStraight', function( d )
{ // Aliased moveStraight of class Game_CharacterBase.
//-----------------------------------------------------------------------------

  if ( $gameMap.isPixelMovement() ) {
    this.pixelMoveStraight( d );

  } else {
    $.alias( d );

  }

}, false );

//-----------------------------------------------------------------------------
$.expand( Game_CharacterBase, 'pixelMoveStraight', function( d )
{ // move straight for pixel movement.
//-----------------------------------------------------------------------------

  const distance = this._travelDistance;
  const x = this.x + ( d == 4 ? -1 : d == 6 ? 1 : 0 ) * distance;
  const y = this.y + ( d == 8 ? -1 : d == 2 ? 1 : 0 ) * distance;

  this.setDirection( d );
  this.setDestination( new Vector2( x, y ) );

}, false );

//-----------------------------------------------------------------------------
$.expand( Game_CharacterBase, 'isSliding', function()
{ // return if the character is sliding.
//-----------------------------------------------------------------------------

  return !this.isMoving() && ( this.velocity.x || this.velocity.y );

}, false );

//-----------------------------------------------------------------------------
  $.alias( Game_CharacterBase, 'refreshBushDepth', function()
  { // Aliased refreshBushDepth of class Game_CharacterBase.
//-----------------------------------------------------------------------------

    if ( $gameMap.isPixelMovement() ) {
      this.pixelRefreshBushDepth();

    } else {
      $.alias();

    }

  }, false );

//-----------------------------------------------------------------------------
  $.expand( Game_CharacterBase, 'pixelRefreshBushDepth', function()
  { // refresh bush depth for pixel movement.
//-----------------------------------------------------------------------------

    if (
      this.isNormalPriority() &&
      !this.isObjectCharacter() && this.isOnBush() && !this.isJumping()
    ) {

      if ( Utils.RPGMAKER_NAME == 'MZ' ) {
        this._bushDepth = $gameMap.bushDepth();

      } else {
        this._bushDepth = 12;

      }

    } else {
      this._bushDepth = 0;

    }

  }, false );

//-----------------------------------------------------------------------------
  $.alias( Game_CharacterBase , 'isOnLadder', function( x, y )
  { // Aliased isOnLadder of class Game_CharacterBas .
//-----------------------------------------------------------------------------

    if ( $gameMap.isPixelMovement() ) {
      return this.isPixelOnLadder( x, y );

    } else {
      $.alias( x, y );

    }


  }, false );

//-----------------------------------------------------------------------------
  $.expand( Game_CharacterBase, 'isPixelOnLadder', function( /*x, y*/ )
  { // return if the character is currently on a ladder.
//-----------------------------------------------------------------------------

    const { x, y } = this.getColliderAt( this.position );
    const tx = Math.round( x / $gameMap.tileWidth() - 0.5 );
    const ty = Math.round( y / $gameMap.tileHeight() - 0.5 );

    return $gameMap.isLadder( tx, ty );

  }, false );

//-----------------------------------------------------------------------------
  $.alias( Game_CharacterBase, 'isOnBush', function( x, y )
  { // Aliased isOnBush of class Game_CharacterBase.
//-----------------------------------------------------------------------------

    if ( $gameMap.isPixelMovement() ) {
      return this.isPixelOnBush( x, y );

    } else {
      return $.alias( x, y );

    }

  }, false );

//-----------------------------------------------------------------------------
  $.expand( Game_CharacterBase, 'isPixelOnBush', function( /*x, y*/ )
  { // retrn if the character is on a bush.
//-----------------------------------------------------------------------------

    const { x, y } = this.getColliderAt( this.position );
    const tx = Math.round( x / $gameMap.tileWidth() - 0.5 );
    const ty = Math.round( y / $gameMap.tileHeight() - 0.5 );

    return $gameMap.isBush( tx, ty );

  }, false );

//-----------------------------------------------------------------------------
  $.alias( Game_CharacterBase, 'terrainTag', function()
  { // Aliased terrainTag of class Game_CharacterBase.
//-----------------------------------------------------------------------------

    if ( $gameMap.isPixelMovement() ) {
      return this.pixelTerrainTag();

    } else {
      return $.alias();

    }

  }, false );

//-----------------------------------------------------------------------------
  $.expand( Game_CharacterBase, 'pixelTerrainTag', function()
  { // return the pixel terrain tag.
//-----------------------------------------------------------------------------

    const { x, y } = this.getColliderAt( this.position );
    const tx = Math.round( x / $gameMap.tileWidth() - 0.5 );
    const ty = Math.round( y / $gameMap.tileHeight() - 0.5 );

    return $gameMap.terrainTag( tx, ty );

  }, false );

//-----------------------------------------------------------------------------
  $.alias( Game_CharacterBase, 'regionId', function()
  { // Aliased regionId of class Game_CharacterBase.
//-----------------------------------------------------------------------------

    if ( $gameMap.isPixelMovement() ) {
      return this.pixelRegionId();

    } else {
      return $.alias();

    }

  }, false );

//-----------------------------------------------------------------------------
  $.expand( Game_CharacterBase, 'pixelRegionId', function()
  { // return the region id on pixel movement map.
//-----------------------------------------------------------------------------


    const { x, y } = this.getColliderAt( this.position );
    const tx = Math.round( x / $gameMap.tileWidth() - 0.5 );
    const ty = Math.round( y / $gameMap.tileHeight() - 0.5 );

    return $gameMap.regionId( tx, ty );

  }, false );

//-----------------------------------------------------------------------------
$.alias( Game_CharacterBase, 'update', function()
{ // Aliased update of class Game_CharacterBase.
//-----------------------------------------------------------------------------

  const pxlMovement = $gameMap.isPixelMovement();
  if ( pxlMovement ) this.updateVelocity();
  $.alias();
  if ( pxlMovement ) this.updateDestination();
  if ( pxlMovement && this.isSliding() ) this.updateSlide();
}, false );

//-----------------------------------------------------------------------------
$.expand( Game_CharacterBase, 'updateSlide', function()
{ // update sliding.
//-----------------------------------------------------------------------------

  if ( !this.isJumping() ) {
    this.updateVelocityX();
    this.updateVelocityY();
    this.updateMove();
  }

}, false );

//-----------------------------------------------------------------------------
$.expand( Game_CharacterBase, 'updateVelocity', function()
{ // Definition.
//-----------------------------------------------------------------------------

  this.updateVelocityX();
  this.updateVelocityY();

  const dpf = this.distancePerFrame();
  const magnitude = this.velocity.magnitude;
  this.velocity.magnitude = ( magnitude ).clamp( 0, dpf );

}, false );

//-----------------------------------------------------------------------------
  $.expand( Game_CharacterBase, 'updateDestination', function()
  { // update the destination.
//-----------------------------------------------------------------------------

    const destination = this._destination;

    if ( destination ) {
      if ( Vector2.equals( this.position, destination.end ) ) {
        this.clearDestination();
        this.refreshBushDepth();
      }

    } else if ( this.isRequestingThrough() && !this._followers.areGathering() ) {
      this.setThrough( this._requestThrough );
      this.clearThroughRequest();
    }

  }, false );

//-----------------------------------------------------------------------------
$.expand( Game_CharacterBase, 'updateVelocityX', function()
{ // update velocity on the x axis.
//-----------------------------------------------------------------------------

  const ax = this.acceleration.x;
  const vx = this.velocity.x;
  const svx = Math.sign( vx );
  const sax = Math.sign( ax );

  const opposite = svx > 0 && sax < 0 || svx < 0 && sax > 0;

  if ( ax ) this.velocity.x += ax;

  if ( !ax || opposite ) {
    const dx = this.decelerationSpeed() * svx;
    const min = svx > 0 ? 0 : -this.distancePerFrame();
    const max = svx > 0 ? this.distancePerFrame() : 0;

    this.velocity.x = ( this.velocity.x - dx ).clamp( min, max );

  }

}, false );

//-----------------------------------------------------------------------------
$.expand( Game_CharacterBase, 'updateVelocityY', function()
{ // update velocity on the y axis.
//-----------------------------------------------------------------------------

  const ay = this.acceleration.y;
  const vy = this.velocity.y;

  const svy = Math.sign( vy );
  const say = Math.sign( ay );

  const opposite = svy > 0 && say < 0 || svy < 0 && say > 0;

  if ( ay ) this.velocity.y += ay;

  if ( !ay || opposite ) {
    const dy = this.decelerationSpeed() * svy;
    const min = svy > 0 ? 0 : -this.distancePerFrame();
    const max = svy > 0 ? this.distancePerFrame() : 0;

    this.velocity.y = ( this.velocity.y - dy ).clamp( min, max );

  }

}, false );

// -----------------------------------------------------------------------------
  $.alias( Game_CharacterBase, 'updateMove', function()
  { // Aliased updateMove of class Game_CharacterBase.
//-----------------------------------------------------------------------------

    if ( $gameMap.isPixelMovement() ) {
      if ( !this.isJumping() ) this.updatePixelMove();

    } else {
      $.alias();

    }

  }, false );

//-----------------------------------------------------------------------------
  $.expand( Game_CharacterBase, 'updatePixelMove', function()
  { // update pixel based movement.
//-----------------------------------------------------------------------------

    const last = this.position;

    if ( this.hasDestination() ) {
      this.updateDestinationMove();

    } else {
      this.updateVelocityMove();

    }

    this.detectCollision();
    this.clampPositionToMap();

    if ( Math.abs( this.position.x - last.x ) < Number.EPSILON )
      this.velocity.x = 0;

    if ( Math.abs( this.position.y - last.y ) < Number.EPSILON )
      this.velocity.y = 0;

    if ( this.hasDestination() ) this.recalculateDestination( last );

    const stepSize = Vector2.subtract( this.position, last ).magnitude;
    const lastStepSize = Math.floor( $gameParty._steps );

    this.increaseSteps( stepSize );

    if ( Math.floor( $gameParty._steps ) != lastStepSize ) {
      $gameParty.onPlayerWalk();
    }

  }, false );

//-----------------------------------------------------------------------------
  $.expand( Game_CharacterBase, 'recalculateDestination', function( last )
  { // recalculate the destination acceleration direction after collision.
//-----------------------------------------------------------------------------

    if ( this.hasDestination() ) {

      const delta = Vector2.subtract( last, this.position );

      if ( delta.magnitude < ( 0.25 / $gameMap.tileWidth() ) ) {
        this.clearDestination();

      } else if ( !this.destinationReached() ) {
        const { end } = this._destination;
        let acceleration = Vector2.subtract( end, this.position );
        acceleration = Vector2.normalized( acceleration );

        this._destination.acceleration = acceleration;
        this.setDirectionFromVector( Vector2.reversed( delta ) );

      }

    }

  }, false );

//-----------------------------------------------------------------------------
  $.expand( Game_CharacterBase, 'clampPositionToMap', function()
  { // clamp the players position to the map.
//-----------------------------------------------------------------------------

    const minX = 0;
    const maxX = $gameMap.width() - 1;
    const minY = 0;
    const maxY = $gameMap.height() - 1;

    if ( $gameMap.isLoopHorizontal() ) {
      this._x = ( this._x ).mod( maxX + 1 )
      this._realX = ( this._realX ).mod( maxX + 1 )

    } else {
      this._x = ( this._x ).clamp( minX, maxX );
      this._realX = ( this._realX ).clamp( minX, maxX );

    }

    if ( $gameMap.isLoopVertical() ) {
      this._y = ( this._y ).mod( maxY + 1 );
      this._realY = ( this._realY ).mod( maxY + 1 );

    } else {
      this._y = ( this._y ).clamp( minY, maxY );
      this._realY = ( this._realY ).clamp( minY, maxY );

    }

  }, false );

//-----------------------------------------------------------------------------
  $.expand( Game_Character, 'ocRamRegionCollider', function( x, y )
  { // return if the region is blocked via ocram pasage plugin.
//-----------------------------------------------------------------------------

    const $ = OcRam.Passages.parameters;
    const coverId = Number( $['Cover Region ID'] );
    const blockedId = Number( $['Block Region ID'] );
    const overpassId = Number( $['Overpass Region ID'] );
    const overheadId = Number( $['Overhead Region ID'] );
    const underpassId = Number( $['Underpass Region ID'] );
    const autoCoverId = Number( $['Cover Autotile Region ID'] );
    const blockedHighLowId = Number( $['Block High-Low Region ID'] );
    const nextRegion = $gameMap.regionId( x, y );
    const regionId = $gameMap.regionId( this.x, this.y );
    const isHighLevel = this._higherLevel;
    const isCover = ( regionId == coverId || regionId == autoCoverId );

    let blocked = false;
    if ( nextRegion == blockedId ) {
      blocked = true;

    } else {
      if ( isHighLevel ) {
        if ( isCover ) {

          if ( nextRegion == underpassId ) blocked = true;
        }

        if ( regionId == blockedHighLowId && nextRegion == underpassId ) {
            blocked = true;
        }
      } else {
        if ( isCover && ( nextRegion == overpassId || nextRegion == 0 ) ) {
          blocked = true;
        }
        if ( nextRegion == overheadId ) blocked = true;
      }

    }

    const rx = Math.round( x );
    const ry = Math.round( y )

    if ( blocked ) return $gameMap.getFullRectTile( rx, ry );

    return null;

  }, false );

//-----------------------------------------------------------------------------
  $.expand( Game_CharacterBase, 'ocRamPassageColliders', function()
  { // get all oc ram passage colliders.
//-----------------------------------------------------------------------------

    const x1 = Math.floor( this.x - 2 );
    const x2 = Math.ceil( this.x + 2 );
    const y1 = Math.floor( this.y - 2 );
    const y2 = Math.ceil( this.y + 2 );
    const colliders = [];

    for ( let i = x1, l = x2; i < l; i++ ) {
      for ( let j = y1, l = y2; j < l; j++ ) {


        const collider = this.ocRamRegionCollider( i, j );
        if ( collider ) colliders.push( collider );

      };
    };

    return colliders;

  }, false );

//-----------------------------------------------------------------------------
  $.expand( Game_CharacterBase, 'detectCollision', function()
  { // detect any colisions and adjust for them!.
//-----------------------------------------------------------------------------

    let colliders = this.getValidColliders();
    let hit = null;
    let limit = 5;

    if ( this.isThrough() || this.isDebugThrough() ) return false;
    if ( this.isJumping() ) return false;
    do {

      let hits = [];
      const collider = this.getCollider();

      for ( let i = 0; i < colliders.length; i++ ) {
        hit = CollisionManager.testCollision( collider, colliders[i] );
        if ( !hit ) continue;
        hits.push( hit );
      }

      hit = this.getBestCollision( hits );

      if ( hit ) this.resolveCollision( hit );

      if ( this.isJumping() || limit-- <= 0 ) break;

    } while ( hit );

  }, false );

//-----------------------------------------------------------------------------
  $.expand( Game_CharacterBase, 'getBestCollision', function( hits )
  { // get the best collision ffrom the collisions provided.
//-----------------------------------------------------------------------------

    let hit = CollisionManager.getLongestHit( hits );

    let character = this.characterFromCollision( hit );

    if ( character && !character.isNormalPriority() ) {

      let hitsFiltered = hits.filter( hit => {
        const character = this.characterFromCollision( hit );
        return !character || character.isNormalPriority();
      } );

      hit = CollisionManager.getLongestHit( hitsFiltered );

    }

    if ( character && character._eventId ) {
      this.checkEventTriggerPixelTouch( character );
    }

    return hit;

  }, false );

//-----------------------------------------------------------------------------
$.expand( Game_CharacterBase, 'resolveCollision', function( hit )
{ // resolve the collision provided.
//-----------------------------------------------------------------------------

  const character = this.characterFromCollision( hit );

  if ( !character || character.isNormalPriority() ) {

    this.attemptCliffJump( hit )
    if ( this.isJumping() ) return;

    let overlap = Vector2.divide( hit.overlap, $gameMap.tileWidth() );
    this.position = Vector2.subtract( this.position, overlap );

  }

  if ( character && character._eventId ) {
    this.checkEventTriggerPixelTouch( character );
  }

}, false );

//-----------------------------------------------------------------------------
  $.expand( Game_CharacterBase, 'regionsInCollider', function( collider )
  { // return all region ids in a collider.
//-----------------------------------------------------------------------------

    const aabb = collider.aabb;
    const x = Math.round( aabb.x / $gameMap.width() );
    const y = Math.round( aabb.y / $gameMap.width() );

    let regions = [];

    regions.push( $gameMap.regionId( x, y ) );

    return regions;

  }, false );

//-----------------------------------------------------------------------------
  $.expand( Game_CharacterBase, 'getRaysToward', function( count, direction )
  { // get rays to fire in the direction specified.
//-----------------------------------------------------------------------------

    let rays = [];
    const collider = this.getCollider();
    const start = new Vector2( -direction.y, direction.x );
    start.magnitude = collider.radius;

    for ( let i = 0, l = count - 1; i <= l; i++ ) {

      const offset = Vector2.clone( start );
      offset.angle -= 180 * ( l == 0 ? 0.5 : i / l );

      const x = collider.x + offset.x;
      const y = collider.y + offset.y;

      rays.push( new Segment( x, y, direction.x, direction.y ) );

    }

    return rays;

  }, false );

//-----------------------------------------------------------------------------
  $.expand( Game_CharacterBase, 'canJumpCollision', function( collision )
  { // return if the player can jump over the collision provided.
//-----------------------------------------------------------------------------

    const jumpSegments = collision.b._jumpSegments || [];
    const canJump = jumpSegments.includes( collision.id );
    const acceleration = Vector2.normalized( this.acceleration );


    if ( canJump ) this._jumpThreshold++;
    if ( !canJump ) this._jumpThreshold = 0;
    if ( Vector2.dot( acceleration, collision.normal ) > -0.9 ) return false;
    if ( !canJump || this._jumpThreshold < 20 ) return false;
    if ( collision._edge ) return false;

    return true;

  }, false );

//-----------------------------------------------------------------------------
  $.expand( Game_CharacterBase, 'attemptCliffJump', function( collision )
  { // return if the player jumped off successfully.
//-----------------------------------------------------------------------------

    if ( !this.canJumpCollision( collision ) ) return false;
    const direction = Vector2.reversed( collision.normal );
    const ray = this.getRaysToward( 1, direction )[0];
    const collider = this.getCollider();
    const normal = collision.normal;
    const radius = collider.radius;
    let jumpPosition = null;
    let limit = 5;


    do {

      if ( limit-- < 0 ) break;
      ray._end.magnitude = radius * ( 5 - limit );

      let canLand = false;
      const colliders = this.collidersInShape( ray );
      const rayHit = this.rayCastForJump( ray, colliders );
      const overlap = rayHit ? rayHit.overlap : new Vector2( 0, 0 );
      const delta = Vector2.subtract( ray._end, overlap );
      const intersection = Vector2.add( ray._start, delta );

      if ( delta.magnitude < Number.EPSILON ) continue;

      collider.x = ( intersection.x + -normal.x * radius );
      collider.y = ( intersection.y + -normal.y * radius );

      for ( let i = 0; i < 2; i++ ) {
        if ( !canLand ) {

          const hits = CollisionManager.testCollisions( collider, colliders );
          const hit = CollisionManager.getLongestHit( hits );

          if ( hit ) {
            collider.x -= hit.overlap.x; collider.y -= hit.overlap.y;
          }

          canLand = !hit || hit.overlap.magnitude < 1;

        }
      }

      if ( !canLand ) continue;
      if ( !this.isJumpValid( collider ) ) break;

      jumpPosition = new Vector2( collider.x, collider.y );

    } while ( !jumpPosition );


    this.jumpFromCollision( jumpPosition )

  }, false );

//-----------------------------------------------------------------------------
  $.expand( Game_CharacterBase, 'isJumpValid', function( collider )
  { // return the collider.
//-----------------------------------------------------------------------------

    // const { noJumpRegion } = $.params;
    const charColliders = this.getCharacterColliders();

    // if ( this.regionsInCollider( collider ).includes( noJumpRegion ) ) {
    //   return false;
    // }

    const hits = CollisionManager.testCollisions( collider, charColliders );
    const hit = CollisionManager.getLongestHit( hits );

    if ( hit && hit.overlap.magnitude > 5 ) {
      return false;
    }

    return true;

  }, false );

//-----------------------------------------------------------------------------
  $.expand( Game_CharacterBase, 'jumpFromCollision', function( jumpDestination )
  { // force the character to jump from a collision.
//-----------------------------------------------------------------------------

    if ( !jumpDestination ) return;

    const tw = $gameMap.tileWidth();

    jumpDestination = Vector2.divide( jumpDestination, tw );
    jumpDestination.x -= 0.5;
    jumpDestination.y -= 0.5;

    const delta = Vector2.subtract( jumpDestination, this.position );

    AudioManager.playSe( $.params.jumpSe );
    this.jump( delta.x, delta.y );
    this._jumpThreshold = 0;

  }, false );

//-----------------------------------------------------------------------------
  $.expand( Game_CharacterBase, 'collidersInShape', function( shape )
  { // return all colliders that may collide with the shape provided.
//-----------------------------------------------------------------------------

    let area = shape.aabb;

    area.x -= $gameMap.tileWidth();
    area.y -= $gameMap.tileHeight();
    area.width += $gameMap.tileWidth();
    area.height += $gameMap.tileHeight();

    return this.getMapCollidersInRect( area );

  }, false );

//-----------------------------------------------------------------------------
  $.expand( Game_CharacterBase, 'rayCastForJump', function( ray, colliders )
  { // cast ray against colliders and return all possible hits.
//-----------------------------------------------------------------------------

    let hits = [];

    for ( let i = 0, l = colliders.length; i < l; i++ ) {

      const hit = CollisionManager.reverseRayCast( ray, colliders[i] );
      if ( hit ) hits.push( hit );

    }

    return CollisionManager.getShortestHit( hits );;

  }, false );

//-----------------------------------------------------------------------------
$.expand( Game_CharacterBase, 'characterFromCollision', function( hit )
{ // return the character from the collision if collided with character.
//-----------------------------------------------------------------------------

  if ( !hit )
    return null;

  else if ( hit.b._eventId < 0 )
    return $gamePlayer;

  else if ( hit.b._eventId > 0 )
    return $gameMap.event( hit.b._eventId || 0 );

  else if ( hit.b._vehicleType )
    return $gameMap.vehicle (hit.b._vehicleType );

  else
    return null;

}, false );

//-----------------------------------------------------------------------------
$.expand( Game_CharacterBase, 'checkEventTriggerPixelTouch', function( character )
{ // place holder for other classes.
//-----------------------------------------------------------------------------

  return false;

}, false );

//-----------------------------------------------------------------------------
  $.expand( Game_CharacterBase, 'updateDestinationMove', function()
  { // update movement based on destination.
//-----------------------------------------------------------------------------

    const postion = this.position;
    const { start, end, acceleration } = this._destination;
    const dpfX = this.distancePerFrame() * Math.abs( acceleration.x );
    const dpfY = this.distancePerFrame() * Math.abs( acceleration.y );

    if ( postion.x > end.x ) {
      this._x = this._realX = Math.max( this._realX - dpfX, end.x );
    }

    if ( postion.x < end.x ) {
      this._x = this._realX = Math.min( this._realX + dpfX, end.x );
    }

    if ( postion.y > end.y ) {
      this._y = this._realY = Math.max( this._realY - dpfY, end.y );
    }

    if ( postion.y < end.y ) {
      this._y = this._realY = Math.min( this._realY + dpfY, end.y );
    }

    this.refreshBushDepth();

  }, false );

//-----------------------------------------------------------------------------
  $.expand( Game_CharacterBase, 'updateVelocityMove', function()
  { // update movemet based on velocity vector.
//-----------------------------------------------------------------------------

    this._realX = this._x = ( this._x + this.velocity.x );
    this._realY = this._y = ( this._y + this.velocity.y );

    this.refreshBushDepth();

  }, false );

//-----------------------------------------------------------------------------
$.expand( Game_CharacterBase, 'getDirectionVectors', function( dir8 )
{ // return an object with vectors representing direction.
//-----------------------------------------------------------------------------

  if ( dir8 ) {

    return {
      1 : Vector2.normalized( Vector2.add( Vector2.down(), Vector2.left() ) ),
      2 : Vector2.down(),
      3 : Vector2.normalized( Vector2.add( Vector2.down(), Vector2.right() ) ),
      4 : Vector2.left(), 6 : Vector2.right(),
      7 : Vector2.normalized( Vector2.add( Vector2.up(), Vector2.left() ) ),
      8 : Vector2.up(),
      9 : Vector2.normalized( Vector2.add( Vector2.up(), Vector2.right() ) ),

    }

  } else {

    return {
      2 : Vector2.down(), 4 : Vector2.left(),
      6 : Vector2.right(), 8 : Vector2.up(),
    }

  }

}, false );

//-----------------------------------------------------------------------------
$.expand( Game_CharacterBase, 'getVectorFromDirection', function( d )
{ // return a vector pointing in the direction of d.
//-----------------------------------------------------------------------------

  const is8Dir = $.params.enable8Dir;
  return this.getDirectionVectors( is8Dir )[d] || Vector2.zero();

}, false );

//-----------------------------------------------------------------------------
$.expand( Game_CharacterBase, 'getDirectionFromVector', function( vec2 )
{ // return a vector pointing in the direction of d.
//-----------------------------------------------------------------------------

  let direction = 0;
  let angle1 = vec2.angle;
  let deltaAngle = Infinity;
  let directions = this.getDirectionVectors( this.is8DirSprite() );

  for ( const d in directions ) {

    let angle2 = directions[d].angle;

    if ( angle2 - angle1 < -180 ) angle2 += 360;
    if ( angle2 - angle1 > 180 ) angle2 -= 360;

    if ( Math.abs( angle2 - angle1 ) < deltaAngle ) {
      deltaAngle = Math.abs( angle2 - angle1 );
      direction = d;
    }

  }
  return Number( direction );

}, false );

//-----------------------------------------------------------------------------
$.expand( Game_CharacterBase, 'setAccelerationFromDirection', function( d )
{ // return the acceleration vector based on direction specified.
//-----------------------------------------------------------------------------

  const spd = this.accelerationSpeed();
  const vec2 = this.getVectorFromDirection( d );
  this.acceleration = Vector2.multiply( vec2, spd );

  if ( d % 2 == 1 ) {
    const horz = vec2.x < 0 ? 4 : vec2.x > 0 ? 6 : 0;
    const vert = vec2.y < 0 ? 8 : vec2.y > 0 ? 2 : 0;

    this.setDiagonalDirection( horz, vert )

  } else {
    this.setDirection( d );

  }
}, false );

//-----------------------------------------------------------------------------
  $.expand( Game_CharacterBase, 'is8DirSprite', function()
  { // return if the character is using an 8 directional sprite sheet.
//-----------------------------------------------------------------------------

    return this._8dirSprite;

  }, false );

//-----------------------------------------------------------------------------
$.expand( Game_CharacterBase, 'setDiagonalDirection', function( horz, vert )
{ // set the diagonal direction based on the two directions provided.
//-----------------------------------------------------------------------------

  let set = false;

  if ( this.is8DirSprite() ) {

    const vec2 = this.acceleration;
    const angles = [ null, 225, 180, 135, 270, null, 90, 315, 360, 45];
    const angle = vec2.angle;
    let max = Infinity;
    let d = 0;

    angles.forEach( ( n, i ) => {
      if ( angle != null ) {
        if ( Math.abs( angle - n ) > 180 ) n += n < 180 ? 360 : -360;
        if ( Math.abs( angle - n ) <= max ) {
          max = Math.abs( angle - n );
          d = i;
        }
      }

    }, this );

    if ( d > 0 ) {
      this.setDirection( d );
      return;
    }

  }

  if ( this.direction() == this.reverseDir( horz ) ) {
    this.setDirection( horz );
  }

  if ( this.direction() == this.reverseDir( vert ) ) {
    this.setDirection( vert );
  }

  if ( !set ) this.setDirection( this.direction() );

}, false );

//-----------------------------------------------------------------------------
$.expand( Game_CharacterBase, 'requestThrough', function( value )
{ // request through to be changed after move is finished.
//-----------------------------------------------------------------------------

  this._requestThrough = value;

}, false );

//-----------------------------------------------------------------------------
$.expand( Game_CharacterBase, 'isRequestingThrough', function()
{ // return if we're requesting through change.
//-----------------------------------------------------------------------------

  return this._requestThrough === true || this._requestThrough === false;

}, false );

//-----------------------------------------------------------------------------
$.expand( Game_CharacterBase, 'clearThroughRequest', function()
{ // clear request for thrugh change.
//-----------------------------------------------------------------------------

  this._requestThrough = null;

}, false );

//-----------------------------------------------------------------------------
$.expand( Game_CharacterBase, 'canTriggerCharacter', function( character, innerCheck = false )
{ // return if the character can be triggered by the player.
//-----------------------------------------------------------------------------

  this.colliders.circle.radius += this._triggerDistance;
  const c1 = this.getColliderAt( this.position );
  const c2 = character.getColliderAt( character.position, true )
  this.colliders.circle.radius -= this._triggerDistance;

  if ( this._higherLevel != character._higherLevel ) return false;

  if ( !CollisionManager.testCollision( c1, c2 ) ) return false;

  if ( innerCheck && ( !this.isNormalPriority() || !character.isNormalPriority() ) ) {
    return CollisionManager.PointxRect( c1, c2 );
  }

  const delta = Vector2.subtract( c2.center, c1 );

  let angle1 = this.getVectorFromDirection( this.direction() ).angle;
  let angle2 = delta.angle;

  if ( angle2 - angle1 < -180 ) angle2 += 360;
  if ( angle2 - angle1 > 180 ) angle2 -= 360;

  return Math.abs( angle2 - angle1 ) < 27.5;

}, false );

//=============================================================================
// Game_Event :
//=============================================================================

//-----------------------------------------------------------------------------
  $.alias( Game_Event, 'setupPage', function()
  { // Aliased setupPage of class Game_Event.
//-----------------------------------------------------------------------------

    $.alias();
    if ( $gamePlayer.lastTriggeredEvent() == this._eventId ) {
      $gamePlayer.clearLastTriggered()
    }

  }, false );

//-----------------------------------------------------------------------------
  $.alias( Game_Event, 'setupPageSettings', function()
  { // Aliased setupPageSettings of class Game_Event.
//-----------------------------------------------------------------------------

    $.alias();
    if ( $gameMap.isPixelMovement() ) {
      this.setupPageHitbox();
    }

    this.setup8Dir();

  }, false );

//-----------------------------------------------------------------------------
  $.expand( Game_Event, 'setupPageHitbox', function()
  { // setup the hitbox based on the current page.
//-----------------------------------------------------------------------------

    const page = this.page();
    const list = page ? this.list() : [];

    this.resetHitbox();

    for ( let i = 0, l = list.length; i < l; i++ ) {

      const { code, parameters } = list[i];
      const regxp = /\<\s*hitbox\s*:\s*(-?\d+)\s*,\s*(-?\d+)\s*,\s*(-?\d+)\s*\>/;

      if ( code != 108 && code != 408 ) continue;
      if ( !parameters[0].match( regxp ) ) continue;
      const x = Number( RegExp.$1 );
      const y = Number( RegExp.$2 );
      const s = Number( RegExp.$3 );

      this.colliders = {
        hitbox: new Rect( 0, 0, s, s ),
        circle: new Circle( 0, 0, s / 2 )
      }

      this.colliders.circle._ox = x;
      this.colliders.circle._oy = y;
      this.colliders.hitbox._ox = x;
      this.colliders.hitbox._oy = y;

      break;

    }

  }, false );

//-----------------------------------------------------------------------------
  $.expand( Game_Event, 'setup8Dir', function()
  { // setup whether a sprite uses 8 dirext.
//-----------------------------------------------------------------------------

    const list = this.page() ? this.list() : [];

    this.clear8Dir();

    for ( let i = 0, l = list.length; i < l; i++ ) {

      const { code, parameters } = list[i];
      const regxp = /\<\s*8dir\s*\>/;

      if ( code != 108 && code != 408 ) continue;
      if ( !parameters[0].match( regxp ) ) continue;

      this._8dirSprite = true;

      break;

    }


  }, false );

//-----------------------------------------------------------------------------
  $.alias( Game_Event, 'clearPageSettings', function()
  { // Aliased clearPageSettings of class Game_Event.
//-----------------------------------------------------------------------------

    $.alias();
    if ( $gameMap.isPixelMovement() ) {
      this.resetHitbox();
      this.clear8Dir();
    }

  }, false );

//-----------------------------------------------------------------------------
  $.expand( Game_Event, 'resetHitbox', function()
  { // reset the hitbox to default values.
//-----------------------------------------------------------------------------

    const tw = $gameMap.tileWidth();
    const th = $gameMap.tileHeight();

    this.colliders = {
      hitbox: new Rect( 0, 0, tw, th ),
      circle: new Circle( 0, 0, tw / 2 )
    }

  }, false );

//-----------------------------------------------------------------------------
  $.expand( Game_Event, 'clear8Dir', function()
  { // clear 8 directional flag.
//-----------------------------------------------------------------------------

    this._8dirSprite = false;

  }, false );

//-----------------------------------------------------------------------------
$.expand( Game_Event, 'checkEventTriggerPixelTouch', function( character )
{ // check if the event is collided with the player and needs to start.
//-----------------------------------------------------------------------------

  const isValid = character && character == $gamePlayer;
  const eventRunning = $gameMap.isEventRunning();
  const isNormal = this.isNormalPriority();
  const eventTouch = this._trigger == 2;
  const jumping = this.isJumping();

  if ( !eventRunning && isValid && isNormal && eventTouch && !jumping ) {
    if ( this.canTriggerCharacter( $gamePlayer, true ) ) {
      $gamePlayer.clearDestination();
      this.start();
    }
  }

}, false );

//-----------------------------------------------------------------------------
  $.alias( Game_Event, 'start', function()
  { // Aliased start of class Game_Event.
//-----------------------------------------------------------------------------

    if ( $gameMap.isPixelMovement() ) {
      this.pixelStart();

    } else {
      $.alias();

    }

  }, false );

//-----------------------------------------------------------------------------
  $.expand( Game_Event, 'pixelStart', function()
  { // start event for pixel movement.
//-----------------------------------------------------------------------------

    if ( $gamePlayer.lastTriggeredEvent() == this ) {
      if ( this.isTriggerIn( [1, 2] ) ) return;
    }

    const list = this.list();

    if ( list && list.length > 1 ) {
        this._starting = true;
        if ( this.isTriggerIn( [0, 1, 2] ) ) this.lock();
        $gamePlayer.setLastTriggered( this._eventId );
    }

  }, false );

//=============================================================================
// Game_Player :
//=============================================================================

//-----------------------------------------------------------------------------
$.alias( Game_Player, 'initMembers', function()
{ // Aliased initMembers of class Game_Player.
//-----------------------------------------------------------------------------

  $.alias();

  this._triggerDistance = 12;
  this._lastTriggered = 0;

  this.colliders.circle._ox = $.params.playerCollider.x;
  this.colliders.circle._oy = $.params.playerCollider.y;
  this.colliders.circle.radius = $.params.playerCollider.radius;

  this.colliders.hitbox._ox = $.params.playerCollider.x;
  this.colliders.hitbox._oy = $.params.playerCollider.y;
  this.colliders.hitbox.width = $.params.playerCollider.radius * 2;
  this.colliders.hitbox.height = $.params.playerCollider.radius * 2;

}, false );

//-----------------------------------------------------------------------------
  $.expand( Game_Player , 'is8DirSprite', function()
  { // return if the player is an 8 directional sprite sheet.
//-----------------------------------------------------------------------------

    const leader = $gameParty.leader();
    return leader ? leader.actor().meta['8dir'] : false;

  }, false );

//-----------------------------------------------------------------------------
$.expand( Game_Player, 'setLastTriggered', function( eventId )
{ // set the last triggered event id.
//-----------------------------------------------------------------------------

  this._lastTriggered = eventId;

}, false );

//-----------------------------------------------------------------------------
  $.expand( Game_Player, 'clearLastTriggered', function()
  { // clear the last triggered event id.
//-----------------------------------------------------------------------------

    this._lastTriggered = 0;

  }, false );

//-----------------------------------------------------------------------------
  $.expand( Game_Player, 'lastTriggeredEvent', function()
  { // return the last triggered event.
//-----------------------------------------------------------------------------

    return $gameMap.event( this._lastTriggered );

  }, false );

//-----------------------------------------------------------------------------
  $.alias( Game_Player, 'getCharacterColliders', function()
  { // Aliased getCharacterColliders of class Game_Player.
//-----------------------------------------------------------------------------

    // $.alias();
    const characters = this.allCharacters().filter( char => {
      if ( !char || char === this ) return false;
      if ( char == this.vehicle() ) return false;
      if ( char._memberIndex > 0 ) return false;
      if ( char === $gamePlayer ) return false;
      if ( char.isThrough() ) return false;
      if ( Imported.OcRam_Passages ) {
        if ( char._higherLevel != this._higherLevel ) return false;
      }
      return true;
    } );

    return characters.map( char => { return char.getCollider( true ); } );

  }, false );

//-----------------------------------------------------------------------------
$.alias( Game_Player, 'getCollider', function( useHitbox )
{ // Aliased getCollider of class Game_Player.
//-----------------------------------------------------------------------------

  if ( this.isInVehicle() ) {
    this.vehicle().syncWithPlayer();
    return this.vehicle().getCollider( useHitbox );
  }
  return $.alias( useHitbox );

}, false );

//-----------------------------------------------------------------------------
  $.alias( Game_Player, 'increaseSteps', function( amount )
  { // Aliased increaseSteps of class Game_Player.
//-----------------------------------------------------------------------------

    if ( $gameMap.isPixelMovement() ) {
      this.pixelIncreaseSteps( amount );
    } else {
      $.alias();

    }

  }, false );

//-----------------------------------------------------------------------------
  $.expand( Game_Player, 'pixelIncreaseSteps', function( amount )
  { // Aliased pixelIncreaseSteps of class Game_Player.
//-----------------------------------------------------------------------------

    Game_Character.prototype.increaseSteps.call( this );
    if ( this.isNormal() ) $gameParty.increaseSteps( amount );
    this.updateEncounterCount( amount );

  }, false );

//-----------------------------------------------------------------------------
  $.alias( Game_Player, 'executeEncounter', function()
  { // Aliased executeEncounter of class Game_Player.
//-----------------------------------------------------------------------------

    const results = $.alias();
    if ( $gameMap.isPixelMovement() ) this.pixelExecuteEncounter( results );

    return results;

  }, false );

//-----------------------------------------------------------------------------
  $.expand( Game_Player, 'pixelExecuteEncounter', function( results )
  { // extra functionality for execute encounter.
//-----------------------------------------------------------------------------

    if ( results ) {

        this.setAccelerationFromDirection( 0 );
        this.clearDestination();

    }

  }, false );

//-----------------------------------------------------------------------------
  $.alias( Game_Player, 'updateEncounterCount', function( amount = 0 )
  { // Aliased updateEncounterCount of class Game_Player.
//-----------------------------------------------------------------------------

    if ( $gameMap.isPixelMovement() ) {
      this.updatePixelEncounterCount( amount );

    } else {
      $.alias();

    }

  }, false );

//-----------------------------------------------------------------------------
  $.expand( Game_Player, 'updatePixelEncounterCount', function( amount )
  { // update encounter count for pixle movement.
//-----------------------------------------------------------------------------

    if ( this.canEncounter() ) {
      this._encounterCount -= this.encounterProgressValue() * amount;
    }

  }, false );

//-----------------------------------------------------------------------------
$.alias( Game_Player, 'update', function( sceneActive )
{ // Aliased update of class Game_Player.
//-----------------------------------------------------------------------------

  $.alias( sceneActive );

  if ( $gameMap.isPixelMovement() ) {
    this.pixelUpdate( sceneActive );
  }

}, false );

//-----------------------------------------------------------------------------
  $.expand( Game_Player, 'pixelUpdate', function( sceneActive )
  { // update pixel movement related stuff.
//-----------------------------------------------------------------------------

    this.updateLastTriggered();

    if ( $.params.debugMode ) this.debugDraw();

    if ( !$gameMap.isEventRunning() && this.isMoving() ) {
      if ( sceneActive ) this.triggerAction();
    }

  }, false );

//-----------------------------------------------------------------------------
  $.alias( Game_Player, 'updateDestination', function()
  { // Aliased updateDestinatin of class Game_Player.
//-----------------------------------------------------------------------------

    $.alias();

    if ( $gameTemp.isDestinationValid() && this.hasDestination() ) {
      const x = $gameTemp.destinationX();
      const y = $gameTemp.destinationY();

      if ( !Vector2.equals( new Vector2( x, y ), this._destination.end ) ) {
        this._destination = null;

      } else if ( this.getInputDirection() > 0 ) {
        this.clearDestination();

      }

    }


  }, false );

//-----------------------------------------------------------------------------
  $.alias( Game_Player, 'updateDashing', function()
  { // Aliased updateDashing of class Game_Player.
//-----------------------------------------------------------------------------

    if ( $gameMap.isPixelMovement() ) {
      this.updatePixelDashing();

    } else {
      $.alias();

    }

  }, false );

//-----------------------------------------------------------------------------
  $.expand( Game_Player, 'updatePixelDashing', function()
  { // update dash for pixel movement.
//-----------------------------------------------------------------------------

    if (this.canMove() && !this.isInVehicle() && !$gameMap.isDashDisabled()) {

      const destValid = $gameTemp.isDestinationValid();
      const dashPressed = this.isDashButtonPressed();

      this._dashing = dashPressed || destValid;

    } else {

      this._dashing = false;

    }

  }, false );

//-----------------------------------------------------------------------------
  $.alias( Game_Player, 'clearDestination', function()
  { // Aliased clearDestination of class Game_Player.
//-----------------------------------------------------------------------------

    $.alias();
    $gameTemp.clearDestination();

  }, false );

//-----------------------------------------------------------------------------
$.alias( Game_Player, 'repositionColliders', function( position )
{ // Aliased repositionColliders of class Game_Player.
//-----------------------------------------------------------------------------

  $.alias( position );
  this.colliders.hitbox._eventId = -1;
  this.colliders.circle._eventId = -1;

}, false );

//-----------------------------------------------------------------------------
$.expand( Game_Player, 'updateLastTriggered', function()
{ // update the last triggered event.
//-----------------------------------------------------------------------------

  const event = this.lastTriggeredEvent();

  if ( event ) {

    this.colliders.circle.radius += 1;
    const c1 = this.getColliderAt( this.position );
    const c2 = event.getColliderAt( event.position, true )
    this.colliders.circle.radius -= 1;

    if ( event.isNormalPriority() == false ) {
      const hit = CollisionManager.PointxRect( c1, c2 );
      if ( !hit ) this.clearLastTriggered();

    } else if ( !CollisionManager.testCollision( c1, c2 ) ) {
      return this.clearLastTriggered();

    }

  }

}, false );

//-----------------------------------------------------------------------------
$.alias( Game_Player, 'getInputDirection', function()
{ // Aliased getInputDirection of class Game_Player.
//-----------------------------------------------------------------------------

  if ( $gameMap.isPixelMovement() ) {
    return this.getPixelInputDirection();

  } else {
    return $.alias();

  }

}, false );

//-----------------------------------------------------------------------------
$.expand( Game_Player, 'getPixelInputDirection', function()
{ // return input direction for pixel movement.
//-----------------------------------------------------------------------------

  if ( $.params.enable8Dir ) return Input._dir8;
  return Input._dir4;

}, false );

//-----------------------------------------------------------------------------
$.alias( Game_Player, 'moveByInput', function()
{ // Aliased moveByInput of class Game_Player.
//-----------------------------------------------------------------------------

  if ( $gameMap.isPixelMovement() ) {
    this.pixelMoveByInput();

  } else {
    $.alias();

  }

}, false );

//-----------------------------------------------------------------------------
$.expand( Game_Player, 'pixelMoveByInput', function()
{ // allow pixel movement based on player input.
//-----------------------------------------------------------------------------

    this.setAccelerationFromDirection( 0 );

    if ( !this.isMoving() && this.canMove() && !this.isJumping() ) {

      let direction = this.getInputDirection();

      if ( [5, 0].includes( direction ) ) this._jumpThreshold = 0;

      if ( direction > 0 && this.hasDestination() ) {

        this.clearDestination();

      } else if ( $gameTemp.isDestinationValid() ) {

        const x = $gameTemp.destinationX();
        const y = $gameTemp.destinationY();

        this.setDestination( new Vector2( x, y ) );

      }

      this.setAccelerationFromDirection( direction );

    }

}, false );

//-----------------------------------------------------------------------------
$.expand( Game_Player, 'checkEventTriggerPixelTouch', function( character )
{ // check for event/player trigger on collision.
//-----------------------------------------------------------------------------

  if ( this.canStartLocalEvents() && character && character != this ) {

    const priority = character.isNormalPriority();
    if ( character.isTriggerIn( [1, 2] ) ) {
      if ( this.canTriggerCharacter( character, true ) ) {
        this.clearDestination();
        character.start();
      }
    }

  }

}, false );

//-----------------------------------------------------------------------------
$.alias( Game_Player, 'updatePixelMove', function()
{ // Aliased updatePixelMove of class Game_Player.
//-----------------------------------------------------------------------------

  const last = this.position;

  $.alias();

  this._followers.updateMove();
  if ( Vector2.equals( this.position, last ) ) {
    this.setAccelerationFromDirection( 0 );
  }


}, false );

//-----------------------------------------------------------------------------
$.expand( Game_Player, 'debugDraw', function()
{ // draw debug shapes.
//-----------------------------------------------------------------------------

  const colliders = this.getValidColliders();
  const collider = this.getColliderAt( this.position );

  $gameTemp.debugDrawShape( collider, 0xFF00FF );

  colliders.forEach( c => {
    const color = c._eventId ? 0xFF00FF : c._vehicleType ? 0xFFFF00 : 0xFF0000;
    $gameTemp.debugDrawShape( c, color );
    $gameTemp.debugDrawShape( c, color );
    $gameTemp.debugDrawShape( c, color );
  } );

}, false );

//-----------------------------------------------------------------------------
  $.alias( Game_Player, 'checkEventTriggerThere', function( triggers )
  { // Aliased checkEventTriggerThere of class Game_Player.
//-----------------------------------------------------------------------------

    if ( $gameMap.isPixelMovement() ) {
      return this.pixelCheckEventTriggerThere( triggers );

    } else {
      return $.alias( triggers );

    }

  }, false );

//-----------------------------------------------------------------------------
  $.expand( Game_Player, 'pixelCheckEventTriggerThere', function( triggers )
  { // check event triggers in front of player for pixel movement.
//-----------------------------------------------------------------------------

    if ( this.canStartLocalEvents() ) {

        const direction = this.direction();
        const x1 = this.x;
        const y1 = this.y;
        const x2 = $gameMap.roundXWithDirection( x1, direction );
        const y2 = $gameMap.roundYWithDirection( y1, direction );
        this.startMapEvent( x2, y2, triggers, true );

        if ( !$gameMap.isAnyEventStarting() && $gameMap.isCounter( x2, y2 ) ) {
            const x3 = $gameMap.roundXWithDirection( x2, direction );
            const y3 = $gameMap.roundYWithDirection( y2, direction );
            this._triggerDistance += $gameMap.tileWidth();
            this.startMapEvent( x3, y3, triggers, true );
            this._triggerDistance -= $gameMap.tileWidth();
        }

    }

  }, false );

//-----------------------------------------------------------------------------
$.alias( Game_Player, 'startMapEvent', function( x, y, triggers, normal )
{ // Aliased startMapEvent of class Game_Player.
//-----------------------------------------------------------------------------

  if ( $gameMap.isPixelMovement() ) {
    this.startPixelMapEvent( x, y, triggers, normal );

  } else {
    $.alias( x, y, triggers, normal );

  }

}, false );

//-----------------------------------------------------------------------------
$.expand( Game_Player, 'startPixelMapEvent', function( x, y, triggers, normal )
{ // start map event in pixel movement map.
//-----------------------------------------------------------------------------

  if ( !$gameMap.isEventRunning() ) {

    for (const event of this.inRangeEvents() ) {

      if ( Imported.OcRam_Passages ) {
        if ( event._higherLevel != this._higherLevel ) continue;
      }

      const priority = event.isNormalPriority();

      if ( event.isTriggerIn( triggers ) && priority == normal ) {
        event.start();
      }

    }
  }

}, false );

//-----------------------------------------------------------------------------
$.expand( Game_Player, 'inRangeEvents', function()
{ // return all events that are within range of the player.
  //-----------------------------------------------------------------------------

  return $gameMap.events().filter( event => {

    return this.canTriggerCharacter( event );

  } );

}, false );

//-----------------------------------------------------------------------------
$.expand( Game_Player, 'getValidColliders', function()
{ // get all valid colliders.
//-----------------------------------------------------------------------------

  let colliders = this.getMapColliders( this.isInVehicle() ).concat(
    this.getCharacterColliders()
  );

  if ( Imported.OcRam_Passages ) {
    colliders = colliders.concat( this.ocRamPassageColliders() );
  }

  return colliders;

}, false );

//-----------------------------------------------------------------------------
$.alias( Game_Player, 'getMapColliders', function( inVehicle )
{ // Aliased getMapColliders of class Game_Player.
//-----------------------------------------------------------------------------

  if ( inVehicle ) {
    return this.getVehicleMapColliders();

  } else {
    return $.alias();
  }

}, false );

//-----------------------------------------------------------------------------
$.expand( Game_Player, 'getVehicleMapColliders', function()
{ // return vehicle colliders for the player.
//-----------------------------------------------------------------------------

  return this.vehicle().getMapColliders();


}, false );

//-----------------------------------------------------------------------------
$.alias( Game_Player, 'canTriggerCharacter', function( character )
{ // Aliased canTriggerCharacter of class Game_Player.
//-----------------------------------------------------------------------------

  if ( character == $gameMap.airship() ) {
    if ( character._mapId != $gameMap.mapId() ) return false;

  } else if ( character == $gameMap.ship() ) {
    if ( character._mapId != $gameMap.mapId() ) return false;

  } else if ( character == $gameMap.boat() ) {
    if ( character._mapId != $gameMap.mapId() ) return false;

  }

  return $.alias( character );

}, false );

//-----------------------------------------------------------------------------
$.alias( Game_Player, 'getOnVehicle', function()
{ // Aliased getOnVehicle of class Game_Player.
//-----------------------------------------------------------------------------

  if ( $gameMap.isPixelMovement() ) {
    this.pixelGetOnVehicle();

  } else {
    $.alias();

  }

}, false );

//-----------------------------------------------------------------------------
$.expand( Game_Player, 'pixelGetOnVehicle', function()
{ // get on vehicle for pixel movement.
//-----------------------------------------------------------------------------

    if ( this.canTriggerCharacter( $gameMap.airship() ) )
      this._vehicleType = "airship";

    else if ( this.canTriggerCharacter( $gameMap.ship() ) )
      this._vehicleType = "ship";

    else if ( this.canTriggerCharacter( $gameMap.boat() ) )
      this._vehicleType = "boat";


    if ( this.isInVehicle() ) {

      const delta = Vector2.subtract( this.vehicle().position, this.position );

      this._vehicleGettingOn = true;
      this.setThrough( true );
      this.setDestination( this.vehicle().position );
      this.setDirection( this.getDirectionFromVector( delta ) )
      this.requestThrough( false );
      this.updateMove();

      this.gatherFollowers();
    }

    return this._vehicleGettingOn;

}, false );

//-----------------------------------------------------------------------------
$.alias( Game_Player, 'getOffVehicle', function()
{ // Aliased getOffVehicle of class Game_Player.
//-----------------------------------------------------------------------------

  if ( $gameMap.isPixelMovement() ) {
    this.pixelGetOffVehicle();

  } else {
    $.alias();

  }

}, false );

//-----------------------------------------------------------------------------
$.expand( Game_Player, 'pixelGetOffVehicle', function()
{ // get off the vehicle for pixel movement.
//-----------------------------------------------------------------------------

  if ( this.vehicle().isLandOk( this.x, this.y, this.direction() ) ) {

    if ( this.isInAirship() ) this.setDirection( 2 );
    this._followers.synchronize( this.x, this.y, this.direction() );

    this.vehicle().getOff();

    if ( !this.isInAirship() ) {
      this.forceMoveForward();
      this.setTransparent( false );
      this.setThrough( true );
    }

    this._vehicleGettingOff = true;
    this.setMoveSpeed( 4 );
    this.makeEncounterCount();
    this.requestThrough( false );
    this.gatherFollowers();
    this.updateMove();

  }

  return this._vehicleGettingOff;

}, false );

//-----------------------------------------------------------------------------
  $.expand( Game_Player, 'pixelStartMapEvent', function( x, y, triggers, normal )
  { // start map event on pixel movement map.
//-----------------------------------------------------------------------------

    if ( !$gameMap.isEventRunning() ) {

      for ( const event of $gameMap.events() ) {
        const hasTriggers = event.isTriggerIn( triggers );
        const isNormal = event.isNormalPriority() == normal;

        if ( this.canTriggerCharacter( event ) && hasTriggers && isNormal ) {
          this.clearDestination();
          event.start();
        }

      }

    }
  }, false );

//=============================================================================
// Game_Follower :
//=============================================================================

//-----------------------------------------------------------------------------
$.alias( Game_Follower, 'initMembers', function()
{ // Aliased initMembers of class Game_Follower.
//-----------------------------------------------------------------------------

  $.alias();

  this.colliders.circle._ox = $.params.playerCollider.x;
  this.colliders.circle._oy = $.params.playerCollider.y;
  this.colliders.circle.radius = $.params.playerCollider.radius;

  this.colliders.hitbox._ox = $.params.playerCollider.x;
  this.colliders.hitbox._oy = $.params.playerCollider.y;
  this.colliders.hitbox.width = $.params.playerCollider.radius * 2;
  this.colliders.hitbox.height = $.params.playerCollider.radius * 2;

}, false );

//-----------------------------------------------------------------------------
  $.alias( Game_Follower, 'isThrough', function()
  { // Aliased isThrough of class Game_Follower.
//-----------------------------------------------------------------------------

    if ( $gameMap.isPixelMovement() ) {
      return this.isPixelThrough();

    } else {
      return $.alias();

    }

  }, false );

//-----------------------------------------------------------------------------
    $.expand( Game_Follower, 'isPixelThrough', function()
    { // return if the character is pixel through.
//-----------------------------------------------------------------------------

      return $gamePlayer.isThrough() && this.isVisible() && !!this.actor();

    }, false );

//-----------------------------------------------------------------------------
$.alias( Game_Follower, 'chaseCharacter', function( character )
{ // Aliased chaseCharacter of class Game_Follower.
//-----------------------------------------------------------------------------

  if ( $gameMap.isPixelMovement() ) {
    this.pixelChaseCharacter( character );

  } else {
    $.alias( character );

  }

}, false );

//-----------------------------------------------------------------------------
  $.expand( Game_Follower, 'is8DirSprite', function()
  { // return if the character can use 8 directional sprites.
//-----------------------------------------------------------------------------

    const actor = this.actor();

    return actor ? actor.actor().meta['8dir'] : false;

  }, false );

//-----------------------------------------------------------------------------
$.expand( Game_Follower, 'pixelChaseCharacter', function( character )
{ // chase a characters path rather than moving directly to a character.
//-----------------------------------------------------------------------------


  if ( $gamePlayer._followers.areGathering() ) {
    if ( Utils.RPGMAKER_NAME == 'MZ' ) {
      if ( !this.isGathered() ) this.setDestination( character.position );
    } else {
      if ( !this.pos( $gamePlayer.x, $gamePlayer.y ) ) this.setDestination( character.position );

    }

  } else {
    const delta = Vector2.subtract( character.position, this.position );

    if ( delta.magnitude > 1 ) {
      delta.magnitude -= 1;
      this.setDestination( Vector2.add( this.position, delta ) );
      // this.setDirection( this.getDirectionFromVector( delta ) );

    }

  }

}, false );

//-----------------------------------------------------------------------------
$.alias( Game_Follower, 'getCharacterColliders', function()
{ // Aliased getCharacterColliders of class Game_Follower.
//-----------------------------------------------------------------------------

  const characters = this.allCharacters().filter( char => {
    if ( !char || char === this ) return false;
    if ( char._memberIndex > 0 ) return false;
    if ( char === $gamePlayer ) return false;
    if ( char.isThrough() ) return false;
    if ( Imported.OcRam_Passages ) {
      if ( char._higherLevel != this._higherLevel ) return false;
    }
    return true;
  } );

  return characters.map( char => { return char.getCollider( true ); } );
  // return $.alias();

}, false );

//=============================================================================
// Game_Vehcile :
//=============================================================================

//-----------------------------------------------------------------------------
$.alias( Game_Vehicle, 'initMembers', function()
{ // Aliased initMembers of class Game_Vehicle.
//-----------------------------------------------------------------------------

  $.alias();

}, false );

//-----------------------------------------------------------------------------
$.alias( Game_Vehicle, 'getCollider', function( useHitbox )
{ // Aliased getCollider of class Game_Character.
//-----------------------------------------------------------------------------

  const collider = $.alias( useHitbox );

  collider._vehicleType = this._type;

  return collider;

}, false );

//-----------------------------------------------------------------------------
$.expand( Game_Vehicle, 'getCharacterColliders', function()
{ // return character colliders.
//-----------------------------------------------------------------------------

  const characters = this.allCharacters().filter( char => {
    if ( !char || char === this ) return false;
    if ( char._memberIndex > 0 ) return false;
    if ( char === $gamePlayer ) return false;
    if ( char.isThrough() ) return false;
    if ( Imported.OcRam_Passages ) {
      if ( char._higherLevel != this._higherLevel ) return false;
    }
    return true;
  } );

  return characters.map( char => { return char.getCollider( true ); } );

}, false );

//-----------------------------------------------------------------------------
$.alias( Game_Vehicle, 'mapCollidersAtPos', function( x, y )
{ // Aliased mapCollidersAtPos of class Game_Vehicle.
//-----------------------------------------------------------------------------

  // $.alias();

  const { TILE_ID_A1 } = Tilemap;

  const tile = {
    x: x, y: y, ids: $gameMap.layeredTiles( x, y )
  };

  return tile.ids.map( id => {
    if ( id >= TILE_ID_A1 ) {
      id = TILE_ID_A1 + Math.floor( ( id - TILE_ID_A1 ) / 48 ) * 48;
    }

    if ( this.isBoat() ) {
      return $gameMap.boatCollider( id, x, y );

    } else if ( this.isShip() ) {
      return $gameMap.shipCollider( id, x, y );

    } else if ( this.isAirship() ) {
      return [];

    }

  } ).filter( collider => !!collider );

}, false );

//-----------------------------------------------------------------------------
$.alias( Game_Vehicle, 'isLandOk', function( x, y, d )
{ // Aliased isLandOk of class Game_Vehicle.
//-----------------------------------------------------------------------------

  if ( $gameMap.isPixelMovement() ) {
    return this.isPixelLandOk( x, y, d );

  } else {
    return $.alias( x, y, d );

  }

}, false );

//-----------------------------------------------------------------------------
$.expand( Game_Vehicle, 'isPixelLandOk', function( x, y, d )
{ // Definition.
//-----------------------------------------------------------------------------

  if ( this.isAirship() ) {

    if ( !$gameMap.isValid( x, y ) ) return false;
    if (  this.unboardCollisionsAt( x, y ) ) return false;

  } else {

    const x2 = $gameMap.roundXWithDirection( x, d );
    const y2 = $gameMap.roundYWithDirection( y, d );

    if ( !$gameMap.isValid( x2, y2 ) ) return false;
    if (  this.unboardCollisionsAt( x2, y2 ) ) return false;

  }

  return true;

}, false );

//-----------------------------------------------------------------------------
$.expand( Game_Vehicle, 'unboardCollisionsAt', function( x, y )
{ // return if the player has any collisions at the position specified.
//-----------------------------------------------------------------------------

  $gamePlayer.repositionColliders( new Vector2( x, y ) );
  this.repositionColliders( new Vector2( x, y ) );

  const collider = this.colliders.circle;
  const colliders = $gamePlayer.getMapColliders().concat( this.getCharacterColliders() );

  for ( let i = 0; i < colliders.length; i++ ) {

    if ( CollisionManager.aabbCollided( collider, colliders[i] ) ) {
      return true;
    }

  }

  this.repositionColliders( this.position );

  return false;

}, false );

//=============================================================================
// Game_Party :
//=============================================================================

//-----------------------------------------------------------------------------
  $.alias( Game_Party, 'steps', function()
  { // Aliased steps of class Game_Party.
//-----------------------------------------------------------------------------

    return Math.floor( $.alias() );

  }, false );

//-----------------------------------------------------------------------------
  $.alias( Game_Party, 'increaseSteps', function( amount )
  { // Aliased increaseSteps of class Game_Party.
//-----------------------------------------------------------------------------

    if ( $gameMap.isPixelMovement() ) {
      this.pixelIncreaseSteps( amount );
    } else {
      $.alias();

    }

  }, false );

//-----------------------------------------------------------------------------
  $.expand( Game_Party, 'pixelIncreaseSteps', function( amount )
  { // increase steps for pixel movement.
//-----------------------------------------------------------------------------

    this._steps += amount;

  }, false );

//=============================================================================
// Game_Temp :
//=============================================================================

//-----------------------------------------------------------------------------
  $.expand( Game_Temp, 'updateDebugLayer', function()
  { // update the debug layer.
//-----------------------------------------------------------------------------

    const debugLayer = SceneManager._scene._debugLayer;
    if ( debugLayer ) debugLayer.updateDebug();

  }, false );

//-----------------------------------------------------------------------------
$.expand( Game_Temp, 'clearDebugLayer', function()
{ // clear the debug layer.
//-----------------------------------------------------------------------------

  const debugLayer = SceneManager._scene._debugLayer;
  if ( debugLayer ) debugLayer._graphic.clear();

}, false );

//-----------------------------------------------------------------------------
$.expand( Game_Temp, 'debugDrawShape', function( collider, color )
{ // draw the collider provided.
//-----------------------------------------------------------------------------

  const debugLayer = SceneManager._scene._debugLayer;

  if ( debugLayer ) debugLayer.drawShape( collider, color );
  if ( debugLayer ) debugLayer.drawShape( collider, color );


}, false );

//=============================================================================
// Scene_Map :
//=============================================================================

//-----------------------------------------------------------------------------
$.alias( Scene_Map, 'create', function()
{ // Aliased create of class Scene_Map.
//-----------------------------------------------------------------------------

  $.alias();
  this.createDebugLayer();

}, false );

//-----------------------------------------------------------------------------
$.expand( Scene_Map, 'createDebugLayer', function()
{ // create a new debug layer for the scene.
//-----------------------------------------------------------------------------

  this._debugLayer = new Debug_Layer();
  this.addChild( this._debugLayer );

}, false );

//=============================================================================
// Sprite_Character :
//=============================================================================

//-----------------------------------------------------------------------------
  $.alias( Sprite_Character, 'characterBlockY', function()
  { // Aliased characterBlockY of class Sprite_Character.
//-----------------------------------------------------------------------------

    if ( this._character.is8DirSprite() ) {
      return this.pixelCharacterBlockY();
    }
    return $.alias();


  }, false );

//-----------------------------------------------------------------------------
  $.expand( Sprite_Character, 'pixelCharacterBlockY', function()
  { // return the character block on the y axis.
//-----------------------------------------------------------------------------

    if (this._isBigCharacter) {
        return 0;
    } else {
        var index = this._character.characterIndex();
        return Math.floor( index / 4 ) * 8;
    }

  }, false );

//-----------------------------------------------------------------------------
  $.alias( Sprite_Character, 'characterPatternY', function()
  { // Aliased characterPatternY of class Sprite_Character.
//-----------------------------------------------------------------------------

    if ( this._character.is8DirSprite() ) {
      return this.pixelCharacterPatternY();
    }
    return $.alias();

  }, false );

//-----------------------------------------------------------------------------
  $.expand( Sprite_Character, 'pixelCharacterPatternY', function()
  { // Definition.
//-----------------------------------------------------------------------------

    const d = this._character.direction();
    return d - ( d >= 5 ? 2 : 1 );

  }, false );

//-----------------------------------------------------------------------------
  $.alias( Sprite_Character, 'patternHeight', function()
  { // Aliased patternHeight of class Sprite_Character.
//-----------------------------------------------------------------------------

    if ( this._character.is8DirSprite() ) {
      return this.pixelPatternHeight();

    } else {
      return $.alias();

    }

  }, false );

//-----------------------------------------------------------------------------
  $.expand( Sprite_Character, 'pixelPatternHeight', function()
  { // return pattern height for pixel movement.
//-----------------------------------------------------------------------------

    if (this._tileId > 0) {
        return $gameMap.tileHeight();

    } else if (this._isBigCharacter) {
        return Math.floor( this.bitmap.height / 8 );

    } else {
        return Math.floor( this.bitmap.height / 16 );

    }

  }, false );

//=============================================================================
} )( Chaucer.CAP );
//=============================================================================
