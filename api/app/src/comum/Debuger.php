<?php
abstract class Debuger
{
   static function json_encode_objs($item)
   {
      if (!is_array($item) && !is_object($item)) {
         return json_encode($item);
      } else {
         $pieces = array();
         foreach ($item as $k => $v) {
            $pieces[] = "\"$k\":" . self::json_encode_objs($v);
         }
         return '{' . implode(',', $pieces) . '}';
      }
   }
   static function debug($data)
   {
      echo "<pre>";
      print_r($data);
      echo "</pre>";
      exit;
   }
}
