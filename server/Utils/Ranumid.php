<?php
function ranumid(int $l=7){
    $id = "";
    for ($i=0; $i < $l; $i++) { 
        $id .= strval(rand(0, 9));
    }
    return $id;
};