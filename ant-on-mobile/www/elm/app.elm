module Adapter where

import Signal (..)

-- Import events from JS
port input : Signal String

triggers : Signal String
triggers =
    let update input state = if | input == "L" -> "sendLeftKeyDown"
                                | input == "R" -> "sendRightKeyDown"
                                | otherwise -> "What should I do!?"
    in  foldp update "" input

-- Export the events
port triggerEvent : Signal String
port triggerEvent = triggers
